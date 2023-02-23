const supportedUnit = [
	{ unit: "mm", multipleToInches: 25.4, label: "millimeters" },
	{ unit: "cm", multipleToInches: 2.54, label: "centimeters" },
	{ unit: "dm", multipleToInches: 0.254, label: "decimeters" },
	{ unit: "m", multipleToInches: 0.0254, label: "meters" },
	{ unit: "in", multipleToInches: 1, label: "inches" },
];
export const convertPixelsToUnit = ({ unit, width, height, dpi, ratio }) => {
	let multipleToInches = 1;
	for (let i in supportedUnit) {
		if (unit == supportedUnit[i].unit) {
			multipleToInches = supportedUnit[i].multipleToInches;
			break;
		}
	}
	width = (width / multipleToInches) * dpi;
	height = (height / multipleToInches) * dpi;

	ratio = width / height;

	return [width, height, ratio];
};
