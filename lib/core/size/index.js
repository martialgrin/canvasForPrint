// import { convertPixelsToUnit } from "../../utils/pixelsToUnit";
import { convertPixelsToUnit } from "./convertInputSizeToPixels";
import setDisplaySize from "./setDisplaySize";

const Size = (props) => {
	let settings = { ...props, widthInPixels: 0, heightInPixels: 0 };
	const CANVASP = settings.elem;
	let displaySize;
	const setSize = () => {
		displaySize = calcSize();
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

	const getCanvasStyleSize = () => {
		displaySize = calcSize();
		return { width: displaySize.width, height: displaySize.height };
	};

	return { setSize, getCanvasSize, getCanvasStyleSize };
};
export default Size;
