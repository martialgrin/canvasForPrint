let cPrint, canvas, container, pane;
let frame = 0;

function setupCanvasForPrint() {
	cPrint = CanvasForPrint({
		container,
		p5Mode: true,
		width: 10,
		height: 10,
		unit: "cm",
		ppi: "300",
		fileName: "p5-example",
		mode: "sequence",
		recordingFrames: { start: 90, end: 1000, current: 0 },
	});
}

function setup() {
	pane = new Tweakpane.Pane();
	settingsInit(pane);
	container = document.getElementById("app");
	setupCanvasForPrint();
	canvas = createCanvas(cPrint.widthInPixels, cPrint.heightInPixels);
	canvas.parent(container);
	// PUT the canvas created into the canvas for print library
	cPrint.setCanvas(canvas);

	initListeners();
	setSize();

	textSize(width / 2);
	textAlign(CENTER, CENTER);

	update();
}

function setSize() {
	const displaySize = cPrint.getStyleSize();
	canvas.elt.style.width = displaySize.width + "px";
	canvas.elt.style.height = displaySize.height + "px";
}
function windowResized() {
	setSize();
}

function draw() {
	//Not cool to use the draw in many cases, you cannot control everything because you cannot control the draw loop
}

function update() {
	cPrint.setFileName(PARAMS.fileName);
	fill(PARAMS.color);
	rect(0, 0, width, height);
	fill(0, 0, 255);
	circle(
		width / 2,
		height / 2 + PARAMS.margin,
		(cPrint.widthInPixels / 4) * 3 * Math.sin((frame + 100) * 0.1)
	);
	fill(255);
	text(frame, width / 2, height / 2);
	frame++;
}

function initListeners() {
	pane.on("change", update);

	cPrint.on("resize", setSize);

	// When Frame is saved go to the next frame
	cPrint.on("frameSaved", update);

	cPrint.on("saved", () => {
		console.log("it's saved");
	});
	cPrint.on("startSaving", () => {
		console.log("you start to save frames");
	});
}
