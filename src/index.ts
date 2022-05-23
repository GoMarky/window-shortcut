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
  'Meta+Z',
  'Meta+Shift+Z',
  'Ctrl+Z',
  'Ctrl+Shift+Z',
];

export interface IWindowShortcut {
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

    if (shiftKey) parts.push(ServiceKey.Shift);
    if (altKey) parts.push(ServiceKey.Alt);
    if (ctrlKey) parts.push(ServiceKey.Ctrl);
    if (metaKey) parts.push(ServiceKey.Meta);

    helpers.sortStrings(parts);
    parts.push(key);

    const accelerator = helpers.toLowerCase(parts.join('+')) as PossibleShortcut;
    const isTwoPartShortcut = accelerator.includes('+');

    if (isTwoPartShortcut) {
      return accelerator;
    }

    return accelerator as PossibleShortcut;
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
      if (helpers.isDev) {
        this.logShortcut(accelerator);
      }

      callbacks.forEach((callback) => callback.call(undefined, event))
    }
  }

  public registerShortcut(accelerator: string, callback: ShortcutCallback): IDisposable {
    if (!WindowShortcut.isValidShortcut(accelerator as PossibleShortcut)) {
      throw new TypeError(`
        You must use only valid shortcuts - ${accelerator}. 
        See https://github.com/GoMarky/window-shortcut/blob/master/README.md
      `);
    }

    let acceleratorShortcuts: Set<ShortcutCallback>;
    const normalizedAccelerator = helpers.toLowerCase(accelerator);

    if (this.shortcuts.has(normalizedAccelerator)) {
      acceleratorShortcuts = this.shortcuts.get(normalizedAccelerator) as Set<ShortcutCallback>;
      acceleratorShortcuts.add(callback);
    } else {
      acceleratorShortcuts = new Set<ShortcutCallback>();
      acceleratorShortcuts.add(callback);
      this.shortcuts.set(normalizedAccelerator, acceleratorShortcuts);
    }

    return toDisposable(() => acceleratorShortcuts.delete(callback));
  }

  public clearAllShortcuts(): void {
    this.shortcuts.forEach((set) => set.clear());
    this.shortcuts.clear();
  }
}

export default new WindowShortcut();
