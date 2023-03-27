import { saveFile } from "./saveFile";

export const saveFileHandler = ({ settings }) => {
	console.log(settings);
	let prefix = settings.fileName;
	let currentFrame = settings.recordingFrames.current;
	let startFrame = settings.recordingFrames.start;
	let endFrame = settings.recordingFrames.end;

	const setFileName = (newFileName) => {
		prefix = newFileName;
	};

	const updateSettings = (newSettings) => {
		settings = { ...newSettings, ...settings };
		prefix = settings.fileName;
		currentFrame = settings.recordingFrames.current;
		startFrame = settings.recordingFrames.start;
		endFrame = settings.recordingFrames.end;
	};

	const sequenceMode = async () => {
		const fileName = prefix + "-" + currentFrame;
		const beforeRecording = async () => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					currentFrame += 1;
					resolve("goToNextFrame");
				}, 1000 / 60);
			});
		};

		const savingFile = async () => {
			console.log(settings);
			await saveFile({ fileName, settings });
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					if (currentFrame >= endFrame) {
						currentFrame = 0;
						resolve("saved");
					} else {
						currentFrame++;
						resolve("saveNextFrame");
					}
				}, settings.timeoutBetweenSavingFrames);
			});
		};

		if (currentFrame < startFrame) {
			const val = await beforeRecording();
			return { state: val, currentFrame: currentFrame };
		} else if (currentFrame >= startFrame && currentFrame <= endFrame) {
			const val = await savingFile();
			return { state: val, currentFrame: currentFrame };
		}
	};

	const pictureMode = async () => {
		await saveFile({ fileName: prefix, settings });
		return { state: "saved" };
	};

	return { pictureMode, sequenceMode, setFileName, updateSettings };
};
