import { saveFile } from "../core/saveFile/saveFile";
import { saveGUI } from "./saveGUI";
import { settingsGUI } from "./settingsGUI";
import "./style.scss";

export const GUI = ({ settings }) => {
	const container = document.createElement("div");
	const savingContainer = saveGUI({
		startFrame: settings.recordingFrames.start,
		endFrame: settings.recordingFrames.end,
		settings,
	});
	const saveButton = savingContainer.saveButton;
	const settingsDisplay = settingsGUI({ container, settings });

	const init = (saveCanvasFn) => {
		initListener(saveCanvasFn);
		document.body.appendChild(container);
		settingsDisplay.settingsButton();
		settingsDisplay.infos();
		container.appendChild(saveButton);
		saveButton.innerHTML = savingContainer.isDownloaded();
		container.setAttribute("id", "canvas-for-print_gui-container");
	};

	const initListener = (saveCanvasFn) => {
		saveButton.addEventListener("click", saveCanvasFn);
	};

	const update = ({ state, currentFrame, ...settings }) => {
		switch (state) {
			case "startSaving":
				saveButton.innerHTML = savingContainer.isDownloading();
				break;
			case "goToNextFrame":
				break;
			case "saveNextFrame":
				savingContainer.updateNumFrame();
				break;
			case "settingMode":
				savingContainer.updateSettings(settings);
				break;
			case "saved":
				setTimeout(() => {
					saveButton.innerHTML = savingContainer.finished();
				}, 500);
				setTimeout(() => {
					saveButton.innerHTML = savingContainer.isDownloaded();
				}, 2000);
				break;
			default:
				break;
		}
		// display(settings);
	};

	return { init, update, saveButton };
};
