window.onload = () => {
	const container = document.getElementById("app");
	const pane = new Tweakpane.Pane();
	settingsInit(pane);

	const canvas = canvasForPrint({
		container,
		width: 896,
		height: 1280,
		unit: "mm",
		dpi: "72",
	});

	const generator = new App({ canvas, pane });

	canvas.on("startSaving", () => {
		console.log("isSaving from main");
	});

	canvas.on("saved", () => {
		console.log("image is saved");
	});
};
