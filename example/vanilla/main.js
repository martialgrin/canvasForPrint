window.onload = () => {
	const container = document.getElementById("app");
	const pane = new Tweakpane.Pane();
	settingsInit(pane);

	const canvas = CanvasForPrint({
		container,
		width: 130,
		height: 140,
		unit: "mm",
		ppi: "300",
	});

	canvas.create();

	const generator = new App({ canvas, pane });

	canvas.on("startSaving", () => {
		console.log("isSaving from main");
	});

	canvas.on("saved", () => {
		console.log("image is saved");
	});
};
