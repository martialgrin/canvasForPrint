import { convertPixelsToUnit } from "../../utils/pixelsToUnit";

const convertInputSizeToPixels = ({ width, height }) => {
	const [widthInPixels, heightInPixels, ratio] = convertPixelsToUnit({
		width,
		height,
	});
	return { widthInPixels, heightInPixels, ratio };
};

export default convertInputSizeToPixels;
