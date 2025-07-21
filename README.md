# @gomarky/window-shortcut

---

## :cd: Installation

* via pnpm `pnpm add @gomarky/window-shortcut`
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

instance.registerShortcut('Ctrl+A', (event: KeyboardEvent) => {
  console.log('Ctrl+A pressed');
})

instance.registerShortcut('Shift+B', (event: KeyboardEvent) => {
  // prevent default browser behaviour
  event.preventDefault();
  
  console.log('Shift+B pressed');
});

// when disposed, u cant use it anymore
instance.dispose();
```

## :warning:

> ⚠️ By default, at every shortcut execution, we DO NOT prevent default behaviour of browser.
> Make sure, that you call `event.preventDefault()` if needed.
> ⚠️ Note: Available only on desktop devices. Mobile browsers/devices is not support. (Due they don't have keyboards =))
---

## 🔓 License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).
