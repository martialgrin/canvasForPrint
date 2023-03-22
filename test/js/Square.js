class Square {
	constructor({ x, y, col, row, width, height, ctx, margin }) {
		this.x = x;
		this.y = y;
		this.col = col;
		this.row = row;
		this.numInArray = col + row;
		this.margin = margin;
		this.width = width - this.margin;
		this.height = height - this.margin;
		this.ctx = ctx;
	}
	setup() {
		this.draw();
	}
	update() {}
	draw() {
		this.ctx.save();
		this.ctx.translate(this.x, this.y);
		this.ctx.rotate(this.numInArray / 10);
		this.ctx.fillStyle = "#000";
		this.ctx.fillRect(this.width / 2, this.height / 2, this.width, this.height);
		this.ctx.fill();
		this.ctx.restore();
	}
}
