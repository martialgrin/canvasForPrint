export const saveGUI = ({ startFrame, endFrame, settings }) => {
	const saveButton = document.createElement("button");
	saveButton.classList.add("canvas-for-print_gui-inner-container");
	saveButton.setAttribute("id", "canvas-for-print_gui-save");
	const numFramesToSave = endFrame - startFrame + 1;
	let currentFrame = 0;

	const spinner =
		"<div id='canvas-for-print_gui-is-downloading'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>";
	const notClickedContent =
		"<svg width='0.9rem' height='0.9rem' viewBox='0 0 224 224' fill='none'><path fill-rule='evenodd' clip-rule='evenodd' d='M67.2 5.6V61.6C67.2 64.69 69.71 67.2 72.8 67.2H151.2C154.29 67.2 156.8 64.69 156.8 61.6V5.6C156.8 2.51 159.31 0 162.4 0H172.24C176.69 0 180.97 1.77 184.12 4.92L219.08 39.88C222.23 43.03 224 47.31 224 51.76V207.2C224 216.48 216.48 224 207.2 224H16.8C7.52 224 0 216.48 0 207.2V16.8C0 7.52 7.52 0 16.8 0H61.6C64.69 0 67.2 2.51 67.2 5.6ZM117.6 0H128.8C131.89 0 134.4 2.51 134.4 5.6V39.2C134.4 42.29 131.9 44.8 128.8 44.8H117.6C114.51 44.8 112 42.29 112 39.2V5.6C112 2.51 114.51 0 117.6 0ZM22.4 95.2V196C22.4 199.09 24.91 201.6 28 201.6H196C199.09 201.6 201.6 199.09 201.6 196V95.2C201.6 92.11 199.09 89.6 196 89.6H28C24.91 89.6 22.4 92.1 22.4 95.2Z' fill='white'/></svg>";
	const numFramesContainer =
		"<p> <span id='canvas-for-print_current-frame'>" +
		currentFrame +
		"</span> / " +
		numFramesToSave +
		"</p>";
	const abortButton = "<button id='canvas-for-print_gui-abort'>abort</button>";
	const isDownloading = () => {
		saveButton.style.backgroundColor = "#00f";
		if (settings.mode === "sequence") {
			return spinner + numFramesContainer;
		} else {
			return spinner;
		}
	};

	const updateSettings = (val) => {
		settings = { ...val, ...settings };
	};

	const finished = () => {
		saveButton.style.backgroundColor = "#0f0";
		return "<span>finished</span>";
	};
	const isDownloaded = () => {
		currentFrame = 0;
		saveButton.style.backgroundColor = "#000";
		return notClickedContent;
	};
	const updateNumFrame = (numFrame) => {
		if (settings.mode === "sequence") {
			currentFrame++;
			const elem = document.getElementById("canvas-for-print_current-frame");
			if (typeof elem != "undefined") {
				elem.innerText = currentFrame;
			}
		}
	};

	return {
		isDownloaded,
		isDownloading,
		updateNumFrame,
		saveButton,
		updateSettings,
		finished,
	};
};
