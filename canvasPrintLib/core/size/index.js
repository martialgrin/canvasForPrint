import { convertPixelsToUnit } from "../../utils/pixelsToUnit";
import convertInputSizeToPixels from "./convertInputSizeToPixels";
import setDisplaySize from "./setDisplaySize";

const Size = (
	props = { width, height, CANVASP, container, unit, dpi, ratio }
) => {
	let settings = { ...props, widthInPixels: 0, heightInPixels: 0 };
	const CANVASP = settings.CANVASP;
	const setSize = () => {
		const displaySize = calcSize();

		CANVASP.width = settings.widthInPixels;
		CANVASP.height = settings.heightInPixels;
		CANVASP.style.width = displaySize.width + "px";
		CANVASP.style.height = displaySize.height + "px";
	};

	const calcSize = () => {
		[settings.widthInPixels, settings.heightInPixels, settings.ratio] =
			convertPixelsToUnit({
				...settings,
			});
		const displaySize = setDisplaySize(settings.ratio, settings.container);
		return displaySize;
	};

	const getCanvasSize = () => {
		return { width: settings.widthInPixels, height: settings.heightInPixels };
	};

	const init = () => {};
	return { init, setSize, getCanvasSize };
};
export default Size;
