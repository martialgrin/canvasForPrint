const setDisplaySize = (ratio, parentContainer) => {
	const parentWidth = parentContainer.offsetWidth;
	let parentHeight = parentContainer.offsetHeight;
	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;

	if (parentHeight == 0) {
		parentContainer.style.height = window.innerHeight + "px";
		parentContainer.style.overflowY = "hidden";
		parentHeight = parentContainer.offsetHeight;
	}

	setDefaultsParamsForWindow();
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
