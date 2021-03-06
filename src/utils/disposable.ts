export interface IDisposable {
  dispose(): void;
}

export function toDisposable(func: () => void): IDisposable {
  return {
    dispose: () => {
      Reflect.apply(func, undefined, []);
    },
  };
}
