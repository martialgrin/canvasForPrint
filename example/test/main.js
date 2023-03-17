window.onload = () => {
	const container = document.getElementById("app");
	const endRecordingFrames = 1000;
	const canvas = CanvasForPrint({
		container,
		width: 895,
		height: 1280,
		unit: "mm",
		dpi: "300",
		mode: "sequence",
		recordingFrames: { start: 0, end: endRecordingFrames, current: 0 },
	});

	const ctx = canvas.ctx;
	let color = 0;

	canvas.on("saving", () => {});
	canvas.on("saved", () => {
		console.log("image is saved");
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
