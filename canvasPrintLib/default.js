export let defaultParams = {
	elem: document.createElement("canvas"),
	size: {
		width: 210,
		height: 297,
		inPixels: {
			width: null,
			height: null,
		},
		dpi: 300,
		unit: "mm",
		ratio: null,
	},
	options: { bleeds: false },
	id: "pdf-canvas",
	container: document.body,
	pixelDensity: window.devicePixelRatio,
	context: "2d",
};
