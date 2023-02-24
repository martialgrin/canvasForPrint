// export let defaultParams = {
// 	elem: document.createElement("canvas"),
// 	size: {
// 		width: 210,
// 		height: 297,
// 		inPixels: {
// 			width: null,
// 			height: null,
// 		},
// 		dpi: 300,
// 		unit: "mm",
// 		ratio: null,
// 	},
// 	options: { bleeds: false },
// 	id: "pdf-canvas",
// 	container: document.body,
// 	pixelDensity: window.devicePixelRatio,
// 	context: "2d",
// };

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
	parent: document.body,
	id: "canvas-for-print",
	pixelDensity: window.devicePixelRatio,
	context: "2d",

	//options
	bleeds: false,
};
