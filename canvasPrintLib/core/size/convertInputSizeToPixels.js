import { convertPixelsToUnit } from "../../utils/pixelsToUnit";

const convertInputSizeToPixels = (sizeParams) => {
	[sizeParams.inPixels.width, sizeParams.inPixels.height, sizeParams.ratio] =
		convertPixelsToUnit(sizeParams);
	return sizeParams;
};

export default convertInputSizeToPixels;
