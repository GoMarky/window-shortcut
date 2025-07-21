# @gomarky/window-shortcut

---

## :cd: Installation

* via npm: `npm install @gomarky/window-shortcut --save`
* via yarn: `yarn add @gomarky/window-shortcut`

## :notebook: List of available shortcuts

```javascript
  // For all platform
  'Ctrl+A',
  'Ctrl+C',
  'Ctrl+V',
  'Ctrl+Z',
  'Ctrl+Shift+Z',
  'Shift+Tab',
  'Tab',
      
  // For MacOS
  'Meta+A',
  'Meta+C', 
  'Meta+V', 
  'Meta+Z', 
  'Meta+Shift+Z'
```

## :rocket: Usage

```javascript
import WindowShortcut from '@gomarky/window-shortcut'

const instance = new WindowShortcut();

instance.registerShortcut('Ctrl+A', () => {
  console.log('Ctrl+A pressed');
})

instance.registerShortcut('Shift+B', () => {
  console.log('Shift+B pressed');
});

// when disposed, u cant use it anymore
instance.dispose();
```

## :warning:

> ⚠️ By default, at every shortcut execute, we DO NOT prevent default behaviour of browser, by calling event.preventDefault().
> Make sure, by doing it by yourself.

> ⚠️ Note: Available only on desktop devices. Mobile browsers/devices is not support. (Due they don't have keyboards =))
---

## 🔓 License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).
