/****** 
 * 
@param {object} PARAMS - Somebody's name. * 
@param {object} PARAMS.size -  size properties
@param {number} PARAMS.size.width -  width of the canvas (default: 210)
@param {number} PARAMS.size.height -  height of the canvas (default: 297)
@param {number} PARAMS.size.dpi -  resolution of the canvas in dpi (default: 300)
@param {string} PARAMS.size.unit -  unit of measure of the canvas (default: mm)
@param {object} PARAMS.options -  options for the canvas
@param {boolean} PARAMS.options.bleeds - define if you want some bleeds or not
 * 
 * ******/

// https://github.com/ertdfgcvb/Sequencer/blob/master/src/sequencer.js

import Size from "./core/size";
import defaults from "./defaults.js";

export const canvasForPrint = (PARAMS) => {
	let settings = { ...defaults, ...PARAMS };
	const CANVASP = settings.elem;
	const ctx = CANVASP.getContext(settings.context);

	const size = Size({
		width: settings.width,
		height: settings.height,
		unit: settings.unit,
		dpi: settings.dpi,
		ratio: settings.ratio,
		CANVASP,
		container: settings.container,
	});

	const init = () => {
		size.setSize();
		const { width, height } = size.getCanvasSize();
		settings.widthInPixels = width;
		settings.heightInPixels = height;
		create();
		return { ...settings };
	};

	const create = () => {
		CANVASP.id = settings.id;
		settings.container.appendChild(CANVASP);
	};

	window.onresize = () => {
		size.setSize();
	};
	init();

	return {
		...settings,

		ctx,
	};
};
