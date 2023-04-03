import canvasForPrint from "./lib";

window.onload = () => {
	const container = document.getElementById("app");
	const endRecordingFrames = 10;
	const canvas = canvasForPrint({
		container,
		width: 89,
		height: 128,
		unit: "cm",
		ppi: "300",
		mode: "picture",
		recordingFrames: { start: 5, end: endRecordingFrames, current: 0 },
	});

	const ctx = canvas.ctx;

	let color = 0;

	canvas.create();

	canvas.on("saved", () => {
		console.log("image is saved");
	});

	canvas.on("resize", () => {
		update();
		console.log(canvas.getStyleSize());
	});
	canvas.on("goToNextFrame", (e) => {
		update();
		canvas.saveCanvas();
	});

	canvas.on("saveNextFrame", (e) => {
		update();
		canvas.saveCanvas();
	});

	const update = () => {
		ctx.fillStyle = "hsl(" + color + ", 100% ,50% )";
		ctx.fillRect(0, 0, canvas.widthInPixels, canvas.heightInPixels);
		ctx.fill();
		color += 360 / endRecordingFrames;
	};
	update();
};
