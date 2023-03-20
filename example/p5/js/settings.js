const PARAMS = {
	factor: 123,
	title: "hello",
	color: "#ff0055",
	columns: 100,
	rows: 100,
	margin: 75,
};

function settingsInit(pane) {
	console.log("init Settings");
	pane.addInput(PARAMS, "factor");
	pane.addInput(PARAMS, "title");
	pane.addInput(PARAMS, "color");

	pane.addInput(PARAMS, "margin", {
		step: 1,
		min: -400,
		max: 400,
	});
}
