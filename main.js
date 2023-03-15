import { canvasForPrint } from "./canvasPrintLib";

window.onload = () => {
	const container = document.getElementById("app");
	let isLoaded = false;
	const image = new Image();
	image.src = "./topaz.png";

	image.onload = () => {
		isLoaded = true;
	};

	const canvas = canvasForPrint({
		container,
		width: 895,
		height: 1280,
		unit: "mm",
	});
	window.addEventListener("saving", () => {
		console.log("yoooo");
	});

	const draw = () => {
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
		if (isLoaded) {
			canvas.ctx.drawImage(
				image,
				0,
				0,
				canvas.widthInPixels,
				canvas.heightInPixels
			);
		}
		canvas.ctx.fillStyle = "#000";

		canvas.ctx.font = "1000px Helvetica";
		for (let i = 1000; i < canvas.heightInPixels; i += 1000) {
			canvas.ctx.fillText("Hello", 0, i);
			canvas.ctx.fillText("World", 2000 + i / 4, i);
			canvas.ctx.fillText("Hello", 2500 + 2000 + i / 4, i);
		}
		if (!isLoaded) {
			requestAnimationFrame(draw.bind(this));
		}
	};
	draw();
};
