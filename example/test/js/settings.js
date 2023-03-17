const PARAMS = {
	factor: 123,
	title: "hello",
	color: "#ff0055",
	columns: 100,
	rows: 100,
	offset: { x: 50, y: 100 },
	margin: 75,
};

function settingsInit(pane) {
	console.log("init Settings");
	pane.addInput(PARAMS, "factor");
	pane.addInput(PARAMS, "title");
	pane.addInput(PARAMS, "color");
	pane.addInput(PARAMS, "offset", {
		picker: "inline",
		expanded: true,
	});
	pane.addInput(PARAMS, "columns", {
		step: 1,
		min: 1,
		max: 100,
	});
	pane.addInput(PARAMS, "margin", {
		step: 1,
		min: 1,
		max: 100,
	});
	pane.addInput(PARAMS, "rows", {
		step: 1,
		min: 1,
		max: 100,
	});
}
