/****** 
 * 
@param {object} userSettings - Insert your settings
@param {number} userSettings.width - width of your desired canvas || default: 210
@param {number} userSettings.height -  height of your desired canvas || default: 297
@param {number} userSettings.ppi -  resolution of the canvas in ppi || default: 300
@param {string} userSettings.unit -  unit of measure of the canvas || default: mm
@param {object} userSettings.container -  container of your object
 * 
 * ******/

import { saveFileHandler } from "./core/saveFile/saveFileHandler";
import Size from "./core/size";
import defaults from "./defaults.js";
import { GUI } from "./UI";

const CanvasForPrint = (userSettings) => {
	let settings = { ...defaults, ...userSettings };
	settings.elem = document.createElement("canvas");
	let CANVASP = settings.elem;
	let Interface = settings.GUI ? GUI({ settings }) : null;
	const handler = saveFileHandler({ settings });
	const ctx = CANVASP.getContext(settings.context);
	const events = [];
	let savingMode = false;
	const size = Size(settings);

	const getStyleSize = () => {
		return size.getCanvasStyleSize();
	};

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
	const setCanvas = (elem) => {
		const element = elem.elt || elem;
		settings.elem = element;
		CANVASP = element;
	};

	const init = () => {
		size.setSize();
		const { width, height } = size.getCanvasSize();
		settings.widthInPixels = width;
		settings.heightInPixels = height;
		if (settings.GUI) {
			Interface.init(saveCanvas);
		}
		updateGUI({ ...settings });
		return { ...settings };
	};

	const create = () => {
		CANVASP.id = settings.id;
		settings.container.appendChild(CANVASP);
	};

	const setFileName = (fileName) => {
		settings.fileName = fileName;
		handler.setFileName(fileName);
	};

	const saveCanvas = async () => {
		if (!savingMode) {
			emit("startSaving");
			updateGUI({
				state: "startSaving",
			});
			savingMode = true;
		}
		if (settings.mode === "sequence") {
			await handler.sequenceMode().then((val) => {
				updateGUI({
					state: val.state,
					currentFrame: val.currentFrame,
					...settings,
				});
				switch (val.state) {
					case "goToNextFrame":
						emit("frameSaved");
						requestAnimationFrame(saveCanvas);
						break;
					case "saveNextFrame":
						emit("frameSaved");
						requestAnimationFrame(saveCanvas);
						break;
					case "saved":
						emit("saved");
						savingMode = false;
						break;
					default:
						break;
				}
			});
		} else {
			await handler.pictureMode().then((val) => {
				updateGUI({
					state: val.state,
					...settings,
				});
				emit("saved");
				savingMode = false;
			});
		}
	};

	window.onresize = () => {
		size.setSize();
		const { width, height } = size.getCanvasSize();
		settings.widthInPixels = width;
		settings.heightInPixels = height;
		emit("resize", settings);
	};

	const setMode = (mode) => {
		settings.mode = mode;
		updateGUI({
			state: "settingMode",
			...settings,
		});
	};

	const updateGUI = ({ state, currentFrame }) => {
		console.log(settings);
		if (settings.GUI) {
			Interface.update({
				state: state,
				currentFrame: currentFrame || 0,
				...settings,
			});
		}
	};

	init();

	return {
		...settings,
		on,
		setMode,
		getStyleSize,
		create,
		saveCanvas,
		ctx,
		setCanvas,
		setFileName,
	};
};

export default CanvasForPrint;
