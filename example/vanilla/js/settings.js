const PARAMS = {
	factor: 123,
	fileName: "hello",
	color: "#ff0055",
	columns: 200,
	rows: 70,
	offset: { x: 0, y: 0 },
	margin: 25,
};

function settingsInit(pane) {
	console.log("init Settings");
	pane.addInput(PARAMS, "factor");
	pane.addInput(PARAMS, "fileName");
	pane.addInput(PARAMS, "color");
	pane.addInput(PARAMS, "offset", {
		picker: "inline",
		expanded: true,
	});
	pane.addInput(PARAMS, "columns", {
		step: 1,
		min: 1,
		max: 200,
	});
	pane.addInput(PARAMS, "margin", {
		step: 1,
		min: 1,
		max: 100,
	});
	pane.addInput(PARAMS, "rows", {
		step: 1,
		min: 1,
		max: 200,
	});
}
