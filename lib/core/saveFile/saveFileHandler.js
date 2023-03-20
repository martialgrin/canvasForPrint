import { saveFile } from "./saveFile";

export const saveFileHandler = ({ settings }) => {
	let prefix = settings.fileName;
	let currentFrame = settings.recordingFrames.current;
	const startFrame = settings.recordingFrames.start;
	const endFrame = settings.recordingFrames.end;

	const setFileName = (newFileName) => {
		prefix = newFileName;
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
			await saveFile(fileName, settings.elem);
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
		await saveFile(prefix, settings.elem);
		return { state: "saved" };
	};

	return { pictureMode, sequenceMode, setFileName };
};
