window.onload = () => {
	const container = document.getElementById("app");

	const canvas = CanvasForPrint({
		container,
		width: 896,
		height: 1280,
		unit: "mm",
		dpi: "72",
		mode: "sequence",
	});

	canvas.on("saving", () => {
		console.log("isSaving from main");
	});
	canvas.on("saved", () => {
		console.log("image is saved");
	});
	canvas.on("saveNextFrame", (e) => {
		console.log(e);
	});
};
