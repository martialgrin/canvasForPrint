import { canvasForPrint } from "./canvasPrintLib";

window.onload = () => {
	const container = document.getElementById("app");

	const canvas = canvasForPrint({
		container,
		size: { width: 100, height: 100 },
	});
	canvas.init();
	canvas.ctx.fillStyle = "#f00";
	console.table(canvas);
	canvas.ctx.fillRect(
		0,
		0,
		canvas.PARAMS.size.inPixels.width,
		canvas.PARAMS.size.inPixels.height
	);
};
