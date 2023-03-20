const setDisplaySize = (ratio, parentContainer) => {
	const parentStyle = getComputedStyle(parentContainer);
	const parentWidth = parseFloat(parentStyle.width);
	let parentHeight =
		parseFloat(parentStyle.height) -
		Number(parentStyle.paddingBottom.match("[0-9.]*")) -
		Number(parentStyle.paddingTop.match("[0-9.]*"));
	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;

	parentHeight =
		windowHeight -
		Number(parentStyle.paddingBottom.match("[0-9.]*")) -
		Number(parentStyle.paddingTop.match("[0-9.]*"));
	parentContainer.style.height = "100%";
	parentContainer.style.overflowY = "hidden";

	// setDefaultsParamsForWindow();
	let displayWidth, displayHeight;

	displayHeight = Math.min(windowHeight, parentHeight);
	displayWidth = displayHeight * ratio;

	if (displayWidth > windowWidth) {
		displayWidth = Math.min(windowWidth, parentWidth);
		displayHeight = displayWidth / ratio;
	}

	return { width: displayWidth, height: displayHeight };
};

const setDefaultsParamsForWindow = () => {
	document.body.style.minHeight = window.innerHeight;
	document.body.style.minWidth = window.innerWidth;
};
export default setDisplaySize;
