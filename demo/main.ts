import windowShortcut from '@/index';

const shortcuts = [
  'Meta+C',
  'Tab',
  'Meta+A',
  'Shift+Tab',
  'Meta+V',
];

for (const accelerator of shortcuts) {
  windowShortcut.registerShortcut(accelerator, (_) => {
    console.log(`${accelerator} is pressed.`);
  })
}
