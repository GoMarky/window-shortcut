import WindowShortcut from '@/index';

const ALLOWED_SHORTCUTS = [
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

const windowShortcut = new WindowShortcut();

for (const accelerator of ALLOWED_SHORTCUTS) {
  windowShortcut.registerShortcut(accelerator, (_) => {
    console.log(`${accelerator} is pressed. 🦄🦄🦄🦄🦄🦄🦄`);
  })
}
