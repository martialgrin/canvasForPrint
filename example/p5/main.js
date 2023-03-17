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


	const elem = new p5.Element(canvas.elem);
	console.log(elem);

	// new p5Instance((sketch) => {
	// 	sketch.setup = () => {
	// 		console.log(sketch);
	// 	};
	// 	sketch.draw = () => {
	// 		// draw with p5.js as usual
	// 		sketch.background(200);
	// 		sketch.noStroke();
	// 		sketch.fill(255, 0, 0);
	// 		sketch.rect(0, 0, sketch.width / 2, sketch.height);
	// 	};
	// }, canvas.elem);
};
