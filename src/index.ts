import * as helpers from './utils/helpers';
import { IDisposable, toDisposable } from './utils/disposable';

type ShortcutCallback<T = void> = (event: KeyboardEvent) => T;
type PossibleShortcut = typeof ALLOWED_SHORTCUTS[number];

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

const serviceKeyLowerCased = Object.values(ServiceKey).map((key) => helpers.toLowerCase(key));

const ALLOWED_SHORTCUTS = [
  'Ctrl+C',
  'Ctrl+V',
  'Meta+A',
  'Shift+Tab',
  'Tab',
  'Meta+C',
  'Meta+V',
] as const;

interface IWindowShortcut {
  registerShortcut(accelerator: PossibleShortcut, callback: ShortcutCallback): IDisposable;

  clearAllShortcuts(): void;
}

class WindowShortcut implements IWindowShortcut {
  private readonly shortcuts: Map<string, Set<ShortcutCallback>> = new Map();

  constructor() {
    this.init();
  }

  private logShortcut(accelerator: PossibleShortcut): void {
    const container = document.querySelector('.app__log-section');
    const el = document.createElement('div');

    el.textContent = `Shortcut ${accelerator} was pressed...`;
    container?.appendChild(el);

    window.setTimeout(() => {
      el.remove();
    }, 10000);
  }

  private static isValidShortcut(accelerator: PossibleShortcut): boolean {
    return ALLOWED_SHORTCUTS.includes(accelerator);
  }

  private static eventToAccelerator(event: KeyboardEvent): PossibleShortcut | undefined {
    const { shiftKey, altKey, ctrlKey, metaKey, key } = event;
    const isPrimaryServiceKey = serviceKeyLowerCased.includes(helpers.toLowerCase(key));

    // If was pressed only service key
    if (isPrimaryServiceKey) {
      return undefined;
    }

    const parts: string[] = [];

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

    helpers.sortStrings(parts);
    parts.push(helpers.toUppercase(key));

    const accelerator = parts.join('+') as PossibleShortcut;
    const isTwoPartShortcut = accelerator.includes('+');

    if (isTwoPartShortcut) {
      return accelerator;
    }

    return helpers.capitalize(accelerator) as PossibleShortcut;
  }

  private onKeydown(event: KeyboardEvent): void {
    const accelerator = WindowShortcut.eventToAccelerator(event);

    if (!accelerator) {
      return;
    }

    this.callByAccelerator(accelerator, event);
  }

  private init(): void {
    if (helpers.isMobileDevice) {
      return console.warn(`[window-shortcut]: package doesn't work properly on mobile devices. Prevent init...`);
    }

    window.addEventListener('keydown', this.onKeydown.bind(this))
  }

  private callByAccelerator(accelerator: PossibleShortcut, event: KeyboardEvent): void {
    const callbacks = this.shortcuts.get(accelerator);

    if (callbacks?.size) {
      event.preventDefault();

      if (helpers.isDev) {
        this.logShortcut(accelerator);
      }

      callbacks.forEach((callback) => callback.call(undefined, event))
    }
  }

  public registerShortcut(accelerator: string, callback: ShortcutCallback): IDisposable {
    if (!WindowShortcut.isValidShortcut(accelerator as PossibleShortcut)) {
      throw new TypeError(`You must use only valid shortcuts - ${accelerator}. See https://github.com/GoMarky/window-shortcut/blob/master/README.md`);
    }

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
