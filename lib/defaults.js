export default {
	//Size
	p5Mode: false,
	elem: document.createElement("canvas"),
	width: 210,
	height: 297,
	ppi: 300,
	widthInPixels: null,
	heightInPixels: null,
	unit: "mm",
	ratio: null,
	mode: "picture",
	recordingFrames: { start: 0, end: 100, current: 0 },
	//container options
	container: document.body,
	id: "canvas-for-print",
	pixelDensity: window.devicePixelRatio,
	context: "2d",
	timeoutBetweenSavingFrames: 100,
	fileName: "CanvasForPrint",
	GUI: true,
	fileExtension: "png",
};
