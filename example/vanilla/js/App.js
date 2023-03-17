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
		console.log(this.pane);
		this.initListeners();
		this.margin = PARAMS.margin;
		this.numCols = PARAMS.columns;
		this.numRows = PARAMS.rows;
		this.offset = PARAMS.offset;
		this.update();
	}
	initListeners() {
		this.canvas.on("startSaving", this.update.bind(this));
		this.canvas.on("saved", this.update.bind(this));
		this.pane.on("change", (ev) => {
			console.log(ev);
			switch (ev.presetKey) {
				case "columns":
					this.numCols = ev.value;
					this.update();
					break;
				case "rows":
					this.numRows = ev.value;
					this.update();
					break;
				case "margin":
					this.margin = ev.value;
					this.update();
					break;
				case "offset":
					this.offset = ev.value;
					this.update();

				default:
					break;
			}
		});
	}
	update() {
		this.ctx.clearRect(0, 0, this.w, this.h);
		this.createSquares();
	}

	createSquares() {
		this.ctx.save();
		this.ctx.translate(this.offset.x, this.offset.y);
		this.squareArray = [];
		for (
			let i = this.margin, col = 0;
			i < this.w;
			i += (this.w - this.margin) / this.numCols, col++
		) {
			for (
				let j = this.margin, row = 0;
				j < this.h;
				j += (this.h - this.margin) / this.numRows, row++
			) {
				const square = new Square({
					x: i,
					y: j,
					col,
					row,
					width: (this.w - this.margin) / this.numCols,
					height: (this.h - this.margin) / this.numRows,
					margin: this.margin,
					ctx: this.ctx,
				});
				this.squareArray.push(square);
				square.setup();
			}
		}
		this.ctx.restore();
	}
	draw() {}
}
