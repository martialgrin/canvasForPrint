# canvasForPrint

This function initializes a canvas element and returns an object with various properties and methods related to the canvas.

Parameters
userSettings (Object): An object containing the user-defined settings for the canvas. The following properties can be set:

width (Number): The width of the canvas in the unit set (default: mm).

height (Number): The height of the canvas in the unit set (default: mm).

dpi (Number): The resolution of the canvas in dpi (default: 300).

unit (String): The unit of measure for the canvas (default: mm).

container (Object): The container element for the canvas (default: document.body).

Returns
An object with the following properties:

p5Mode (Boolean): A flag to determine whether p5.js mode is enabled (default: false).

elem (Object): The canvas element created by the function.

width (Number): The width of the canvas in the unit set (default: mm).

height (Number): The height of the canvas in the unit set (default: mm).

dpi (Number): The resolution of the canvas in dpi (default: 300).

widthInPixels (Number): The width of the canvas in pixels.

heightInPixels (Number): The height of the canvas in pixels.

unit (String): The unit of measure for the canvas (default: mm).

ratio (Number): The ratio of the canvas width to its height.

mode (String): The mode of the canvas (default: picture).

recordingFrames (Object): An object containing the start, end, and current frame for recording (default: { start: 0, end: 100, current: 0 }).

container (Object): The container element for the canvas (default: document.body).

id (String): The ID of the canvas element (default: canvas-for-print).

pixelDensity (Number): The pixel density of the canvas (default: window.devicePixelRatio).

context (String): The context of the canvas (default: 2d).

on (Function): A function for adding event listeners to the canvas.

emit (Function): A function for emitting events from the canvas.

size (Object): An object containing the size of the canvas in pixels and the container element.

initListener (Function): A function for initializing the event listeners for the canvas.

saveFileHandler (Function): A function for handling the saving of the canvas file.

init (Function): A function for initializing the canvas and the UI.

create (Function): A function for creating the canvas element.

saveCanvas (Function): A function for saving the canvas file.

ctx (Object): The 2D rendering context of the canvas element.
