/****** 
 * 
@param {object} userSettings - Insert your settings
@param {number} userSettings.width - width of your desired canvas (in unit setted (default:mm))
@param {number} userSettings.height -  height of your desired canvas (in unit setted (default:mm))
@param {number} userSettings.dpi -  resolution of the canvas in dpi (default: 300)
@param {string} userSettings.unit -  unit of measure of the canvas (default: mm)
@param {object} userSettings.container -  container of your object
 * 
 * ******/

// https://github.com/ertdfgcvb/Sequencer/blob/master/src/sequencer.js

import { saveFile } from "./core/saveFile/saveFile";
import Size from "./core/size";
import defaults from "./defaults.js";
import { Container } from "./UI";

const canvasForPrint = (userSettings) => {
	let settings = { ...defaults, ...userSettings };
	const CANVASP = settings.elem;
	const GUI = Container();
	const saveFileButton = GUI.saveButton;
	const ctx = CANVASP.getContext(settings.context);
	const events = [];

	const on = (eventName, fn) => {
		if (!events[eventName]) {
			events[eventName] = [];
		}
		events[eventName].push(fn);
		return () => {
			events[eventName] = events[eventName].filter((eventFn) => fn !== eventFn);
		};
	};
	const emit = (eventName, data) => {
		const event = events[eventName];
		if (event) {
			event.forEach((fn) => {
				fn.call(null, data);
			});
		}
	};

	const size = Size({
		width: settings.width,
		height: settings.height,
		unit: settings.unit,
		dpi: settings.dpi,
		ratio: settings.ratio,
		CANVASP,
		container: settings.container,
	});

	const initListener = () => {
		saveFileButton.addEventListener("click", saveFileHandler);
	};
	const saveFileHandler = async () => {
		emit("saving", settings);
		await saveFile();
		emit("saved", settings);
		if (settings.mode === "sequence") {
			emit("saveNextFrame", settings);
			settings.recordingFrames.current++;
		}
	};

	const init = () => {
		size.setSize();
		const { width, height } = size.getCanvasSize();
		settings.widthInPixels = width;
		settings.heightInPixels = height;
		create();
		GUI.init();
		GUI.update({ ...settings });
		initListener();
		return { ...settings };
	};

	const create = () => {
		CANVASP.id = settings.id;
		settings.container.appendChild(CANVASP);
	};

	const saveCanvas = () => {
		saveFileHandler();
	};

	window.onresize = () => {
		size.setSize();
		const { width, height } = size.getCanvasSize();
		settings.widthInPixels = width;
		settings.heightInPixels = height;
		GUI.update({ ...settings });
	};
	init();

	return {
		...settings,
		on,
		saveCanvas,
		ctx,
	};
};

export default canvasForPrint;
