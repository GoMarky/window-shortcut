import windowShortcut from '@/index';

const TEST_KEY_ONE = 'Meta+C';

windowShortcut.registerShortcut(TEST_KEY_ONE, () => {
  console.log(`${TEST_KEY_ONE} pressed`);
})

const TEST_KEY_SECOND = 'Tab!';

windowShortcut.registerShortcut(TEST_KEY_SECOND, () => {
  console.log(`${TEST_KEY_SECOND} pressed`);
})
