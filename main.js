import { canvasForPrint } from "./canvasPrintLib";

window.onload = () => {
	const container = document.getElementById("app");

	const canvas = canvasForPrint({
		container,
		width: 100,
		height: 100,
	});
	canvas.init();
	canvas.ctx.fillStyle = "#f00";
	console.table(canvas);
	canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);

	const draw = () => {
		console.log(canvas.width);
		requestAnimationFrame(draw.bind(this));
	};
	draw();
};
