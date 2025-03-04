import {WindowShortcut} from '@/index';

const shortcuts = [
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

const windowShortcut = new WindowShortcut();

for (const accelerator of shortcuts) {
  windowShortcut.registerShortcut(accelerator, (_) => {
    console.log(`${accelerator} is pressed. 🦄🦄🦄🦄🦄🦄🦄`);
  })
}
