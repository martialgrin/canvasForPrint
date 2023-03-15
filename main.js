import { canvasForPrint } from "./canvasPrintLib";

window.onload = () => {
	const container = document.getElementById("app");

	const canvas = canvasForPrint({
		container,
		width: 200,
		height: 200,
	});
	console.log(canvas);

	const draw = () => {
		console.log(canvas.widthInPixels);

		canvas.ctx.fillStyle = "#f00";
		canvas.ctx.fillRect(0, 0, canvas.widthInPixels, canvas.heightInPixels / 2);
		canvas.ctx.fill();
		canvas.ctx.fillStyle = "#00f";
		canvas.ctx.fillRect(
			0,
			canvas.heightInPixels / 2,
			canvas.widthInPixels,
			canvas.heightInPixels
		);

		requestAnimationFrame(draw.bind(this));
	};
	draw();
};
