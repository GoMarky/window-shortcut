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
  'Ctrl+D',
  'Meta+D',
  'Ctrl+O',
  'Meta+O',
  'Ctrl+P',
  'Meta+P',
  'Ctrl+X',
  'Meta+X',
  'Ctrl+Y',
  'Meta+Y',
  'Ctrl+J',
  'Meta+J',
  'Ctrl+U',
  'Meta+U',
  'Ctrl+I',
  'Meta+I',
  'Meta+Q',
  'Ctrl+Q',
  'Meta+E',
  'Ctrl+E',
  'Ctrl+B',
  'Meta+B',
  'Ctrl+P',
  'Meta+P',
  'Ctrl+N',
  'Meta+N',
  'Ctrl+T',
  'Meta+T',
  'Ctrl+F',
  'Meta+F',
  'Meta+A',
  'Ctrl+A',
  'Meta+C',
  'Ctrl+C',
  'Meta+V',
  'Ctrl+V',
  'Meta+Z',
  'Ctrl+Z',
  'Ctrl+W',
  'Meta+W',
  'Meta+S',
  'Ctrl+S',
  'Ctrl+Shift+A',
  'Meta+Shift+A',
  'Ctrl+Shift+D',
  'Meta+Shift+D',
  'Ctrl+Shift+Z',
  'Meta+Shift+Z',
  'Shift+Tab',
  'Tab',
];

export default class WindowShortcut {
  private readonly shortcuts: Map<string, Set<ShortcutCallback>> = new Map();

  constructor() {
    if (!helpers.isClient || helpers.isMobileDevice) {
      return;
    }

    this.init();
  }

  private logShortcut(accelerator: PossibleShortcut): void {
    const container = document.querySelector('.app__log-section');
    const el = document.createElement('div');

    el.textContent = `Shortcut ${accelerator} was pressed...`;
    container?.appendChild(el);

    window.setTimeout(() => el.remove(), 10000);
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

    if (shiftKey) {
      parts.push(ServiceKey.Shift);
    }

    if (altKey) {
      parts.push(ServiceKey.Alt);
    }

    if (ctrlKey) {
      parts.push(ServiceKey.Ctrl);
    }

    if (metaKey) {
      parts.push(ServiceKey.Meta);
    }

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

  public dispose(): void {
    this.clearAllShortcuts();
    window.removeEventListener('keydown', this.onKeydown.bind(this));
  }
}
