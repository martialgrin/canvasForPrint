export default {
	//Size
	elem: document.createElement("canvas"),
	width: 210,
	height: 297,
	dpi: 300,
	widthInPixels: null,
	heightInPixels: null,
	unit: "mm",
	ratio: null,

	//container options
	container: document.body,
	id: "canvas-for-print",
	pixelDensity: window.devicePixelRatio,
	context: "2d",

	//options
	bleeds: false,
};
