import windowShortcut from '@/index';

const TEST_KEY = 'Tab!';

windowShortcut.registerShortcut(TEST_KEY, () => {
  console.log(`${TEST_KEY} pressed`);
})


