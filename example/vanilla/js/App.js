class App {
	constructor({ canvas, pane }) {
		this.pane = pane;
		this.canvas = canvas;
		this.ctx = canvas.ctx;
		this.width = this.w = canvas.widthInPixels;
		this.height = this.h = canvas.heightInPixels;
		this.squareArray = [];
		this.setup();
	}

	setup() {
		this.initListeners();
		this.update();
	}
	initListeners() {
		this.canvas.on("startSaving", this.update.bind(this));
		this.canvas.on("saved", this.update.bind(this));
		this.pane.on("change", (ev) => {
			this.update();
		});
	}
	update() {
		this.ctx.clearRect(0, 0, this.w, this.h);
		this.createSquares();
		this.pane.refresh();
	}

	createSquares() {
		this.ctx.save();
		this.ctx.translate(PARAMS.offset.x, PARAMS.offset.y);
		this.squareArray = [];
		for (
			let i = PARAMS.margin, col = 0;
			i < this.w;
			i += (this.w - PARAMS.margin) / PARAMS.columns, col++
		) {
			for (
				let j = PARAMS.margin, row = 0;
				j < this.h;
				j += (this.h - PARAMS.margin) / PARAMS.rows, row++
			) {
				const square = new Square({
					x: i,
					y: j,
					col,
					row,
					width: (this.w - PARAMS.margin) / PARAMS.columns,
					height: (this.h - PARAMS.margin) / PARAMS.rows,
					margin: PARAMS.margin,
					ctx: this.ctx,
					color: PARAMS.color,
				});
				this.squareArray.push(square);
				square.setup();
			}
		}
		this.ctx.restore();
	}
	draw() {}
}
