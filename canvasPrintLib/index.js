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

import size from "./core/size";
import { defaultParams } from "./default";
import { extendDefaultParams } from "./utils";

export const canvasForPrint = (PARAMS) => {
	PARAMS = { ...defaultParams, ...PARAMS };
	console.log(PARAMS.size);
	const CANVASP = PARAMS.elem;
	const ctx = CANVASP.getContext(PARAMS.context);

	const init = () => {
		PARAMS.size = size.convertInputSizeToPixels(PARAMS.size);
		const displaySize = size.setDisplaySize(
			PARAMS.size.ratio,
			PARAMS.container
		);
		CANVASP.width = PARAMS.size.inPixels.width;
		CANVASP.height = PARAMS.size.inPixels.height;
		CANVASP.style.width = displaySize.width + "px";
		CANVASP.style.height = displaySize.height + "px";
		console.log(PARAMS.elem.style.width);
		create();
	};

	const create = () => {
		CANVASP.id = PARAMS.id;
		PARAMS.container.appendChild(CANVASP);
	};

	return { init, PARAMS, ctx };
};
