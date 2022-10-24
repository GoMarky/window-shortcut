declare interface IDisposable {
  dispose(): void;
}

declare type ShortcutCallback<T = void> = (event: KeyboardEvent) => T;
declare type PossibleShortcut = string;

declare interface IWindowShortcut {
  registerShortcut(accelerator: PossibleShortcut, callback: ShortcutCallback): IDisposable;

  clearAllShortcuts(): void;
}

declare const windowShortcut: IWindowShortcut;

export default windowShortcut;
