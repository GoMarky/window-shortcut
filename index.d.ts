declare interface IDisposable {
  dispose(): void;
}

declare type ShortcutCallback<T = void> = (event: KeyboardEvent) => T;
declare type PossibleShortcut = string;

declare class WindowShortcut {
  registerShortcut(accelerator: PossibleShortcut, callback: ShortcutCallback): IDisposable;

  clearAllShortcuts(): void;
}

export default WindowShortcut;
