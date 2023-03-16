window.onload = () => {
	const container = document.getElementById("app");
	const pane = new Tweakpane.Pane();
	settingsInit(pane);

	const canvas = canvasForPrint({
		container,
		width: 1000,
		height: 500,
		unit: "mm",
	});

	const generator = new App({ canvas, pane });

	canvas.on("startSaving", () => {
		console.log("isSaving from main");
	});

	canvas.on("saved", () => {
		console.log("image is saved");
	});
};
