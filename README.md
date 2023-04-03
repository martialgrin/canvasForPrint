# @martialgrin/CanvasForPrint

CanvasForPrint is a little library to create and export easily your picture or sequence canvas in high resolution.

```diff
- Under construction, some bugs can appears, report them into the issues
```

##Installation

#### NPM install

```sh
npm install canvas-for-print
```

```js
import CanvasForPrint from "canvas-for-print";
```

#### CDN install

```html
<link
	href="https://unpkg.com/canvas-for-print@latest/dist/canvas-for-print.cjs.css"
	rel="stylesheet"
/>
<script src="https://unpkg.com/canvas-for-print@latest/dist/canvas-for-print.umd.js"></script>
```

---

## initialisation

```js
const cPrint = CanvasForPrint({
	...settings,
});

cPrint.create();
```

#### settings table

| type        | label           | Description                                                                                                                |
| ----------- | --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| number      | width           | width of your desired canvas \|\| default: `210 `                                                                          |
| number      | height          | height of your desired canvas \|\| default: `297`                                                                          |
| number      | ppi             | resolution of the canvas in ppi \|\| default: `300`                                                                        |
| string      | unit            | unit of measure of the canvas \|\| default: `"mm"`                                                                         |
| DOM Element | container       | container of your canvas \|\| default: `document.body`                                                                     |
| string      | id              | id of your canvas \|\| default: `"canvas-for-print"`                                                                       |
| string      | context         | context of your canvas \|\| default: `"2d"`                                                                                |
| string      | fileName        | fileName of your file when you save it \|\| default: `"CanvasForPrint"`                                                    |
| string      | mode            | mode for the saving file \|\| default: `"picture"`                                                                         |
| object      | recordingFrames | _!only for sequence mode_ starting & ending recording frame of the canvas \|\| default: `{start:0, end: 100, current: 0 }` |
| boolean     | p5Mode          | turn to true if you use p5 \|\| default: `false`                                                                           |
| boolean     | GUI             | To display the GUI \|\| default: `true`                                                                                    |

##Current Features

####Save Canvas
save frame or sequence in `png` format with transparent support

```js
cPrint.saveCanvas();
```

####context
get the context of the canvas

```js
const ctx = cPrint.ctx;
```

####Saving Mode

##### Mode supported

```js
cPrint.setMode("picture");
```

_save juste one frame of your canvas._.

```js
cPrint.setMode("sequence");
```

_save a sequence related to recordingFrames settings_.

####Setting fileName
get the context of the canvas

```js
cPrint.setFileName("your-filename");
```

### Listeners

A set of listeners to available

```js
cPrint.on("resize",${your-code});
```

when canvas is resized

```js
cPrint.on("frameSaved", ${your-code});
```

when canvas is saved, use this to call update function on sequence mode

```js
cPrint.on("saved", ${your-code});
```

when all frames requested are saved

```js
cPrint.on("startSaving", ${your-code});
```

before entering in saving mode
