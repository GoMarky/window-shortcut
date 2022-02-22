import { sortStrings, toLowerCase, toUppercase } from './utils/helpers';
import { IDisposable, toDisposable } from './utils/disposable';

type ShortcutCallback<T = void> = (...args: any[]) => T;

enum ServiceKey {
  Shift = 'Shift',
  Alt = 'Alt',
  Ctrl = 'Ctrl',
  ControlLeft = 'ControlLeft',
  ControlRight = 'ControlRight',
  AltLeft = 'AltLeft',
  AltRight = 'AltRight',
  Meta = 'Meta',
}

const serviceKeyLowerCased = Object.values(ServiceKey).map((key) => toLowerCase(key));

export interface IWindowShortcut {
  registerShortcut(accelerator: string, callback: ShortcutCallback): IDisposable;

  clearAllShortcuts(): void;
}

class WindowShortcut implements IWindowShortcut {
  private readonly shortcuts: Map<string, Set<ShortcutCallback>> = new Map();

  constructor() {
    this.init();
  }

  private static eventToAccelerator(event: KeyboardEvent): string | undefined {
    const { shiftKey, altKey, ctrlKey, metaKey, key } = event;
    const parts: string[] = [];

    const isServiceKeyWasPressed = shiftKey || altKey || ctrlKey || metaKey;
    const isPrimaryServiceKey = serviceKeyLowerCased.includes(toLowerCase(key));

    // If no one from service keys were pressed, it is not a shortcut
    if (!isServiceKeyWasPressed) {
      return undefined;
    }

    // If was pressed only service key
    if (isPrimaryServiceKey) {
      return undefined;
    }

    switch (true) {
      case shiftKey:
        parts.push(ServiceKey.Shift);
        break;
      case altKey:
        parts.push(ServiceKey.Alt);
        break;
      case ctrlKey:
        parts.push(ServiceKey.Ctrl);
        break;
      case metaKey:
        parts.push(ServiceKey.Meta);
        break;
    }

    sortStrings(parts);

    return parts.join('+') + '+' + toUppercase(key);
  }

  private onKeydown(event: KeyboardEvent): void {
    const accelerator = WindowShortcut.eventToAccelerator(event);

    if (accelerator) {
      event.preventDefault();
      this.callByAccelerator(accelerator);
    }
  }

  private init(): void {
    window.addEventListener('keydown', this.onKeydown.bind(this))
  }

  private callByAccelerator(accelerator: string): void {
    const callbacks = this.shortcuts.get(accelerator);

    if (callbacks?.size) {
      callbacks.forEach((callback) => callback.call(undefined))
    }
  }

  public registerShortcut(accelerator: string, callback: ShortcutCallback): IDisposable {
    let acceleratorShortcuts: Set<ShortcutCallback>;

    if (this.shortcuts.has(accelerator)) {
      acceleratorShortcuts = this.shortcuts.get(accelerator) as Set<ShortcutCallback>;
      acceleratorShortcuts.add(callback);
    } else {
      acceleratorShortcuts = new Set<ShortcutCallback>();
      acceleratorShortcuts.add(callback);
      this.shortcuts.set(accelerator, acceleratorShortcuts);
    }

    return toDisposable(() => acceleratorShortcuts.delete(callback));
  }

  public clearAllShortcuts(): void {
    this.shortcuts.forEach((set) => set.clear());
  }
}

export default new WindowShortcut();
