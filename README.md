# @gomarky/window-shortcut

---

## :cd: Installation

* via npm: `npm install @gomarky/window-shortcut --save`
* via yarn: `yarn add @gomarky/window-shortcut`

## :notebook: List of available shortcuts

```javascript
  'Ctrl+D',
    'Meta+D',
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
    'Tab'
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
