export const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);

export const isDev = process.env.NODE_ENV === 'development';

export function sortStrings(array: string[]): void {
  array.sort((a, b) => {
    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    return 0;
  })
}

export function toUppercase(str?: string): string {
  if (!str) {
    return '';
  }

  return str.toUpperCase();
}

export function toLowerCase(str?: string): string {
  if (!str) {
    return '';
  }

  return str.toLowerCase();
}
