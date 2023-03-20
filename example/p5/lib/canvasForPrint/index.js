var C = {},
	z = {
		get exports() {
			return C;
		},
		set exports(a) {
			C = a;
		},
	};
/*! streamsaver. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
(function (a) {
	((e, t) => {
		a.exports = t();
	})("streamSaver", () => {
		const e = typeof window == "object" ? window : this;
		e.HTMLElement ||
			console.warn("streamsaver is meant to run on browsers main thread");
		let t = null,
			s = !1;
		const r = (i) => {
				try {
					i();
				} catch {}
			},
			p = e.WebStreamsPolyfill || {},
			o = e.isSecureContext;
		let l = /constructor/i.test(e.HTMLElement) || !!e.safari || !!e.WebKitPoint;
		const g =
				o || "MozAppearance" in document.documentElement.style
					? "iframe"
					: "navigate",
			f = {
				createWriteStream: v,
				WritableStream: e.WritableStream || p.WritableStream,
				supported: !0,
				version: { full: "2.0.5", major: 2, minor: 0, dot: 5 },
				mitm: "https://jimmywarting.github.io/StreamSaver.js/mitm.html?version=2.0.0",
			};
		function b(i) {
			if (!i) throw new Error("meh");
			const n = document.createElement("iframe");
			return (
				(n.hidden = !0),
				(n.src = i),
				(n.loaded = !1),
				(n.name = "iframe"),
				(n.isIframe = !0),
				(n.postMessage = (...h) => n.contentWindow.postMessage(...h)),
				n.addEventListener(
					"load",
					() => {
						n.loaded = !0;
					},
					{ once: !0 }
				),
				document.body.appendChild(n),
				n
			);
		}
		function x(i) {
			const n = "width=200,height=100",
				h = document.createDocumentFragment(),
				d = {
					frame: e.open(i, "popup", n),
					loaded: !1,
					isIframe: !1,
					isPopup: !0,
					remove() {
						d.frame.close();
					},
					addEventListener(...m) {
						h.addEventListener(...m);
					},
					dispatchEvent(...m) {
						h.dispatchEvent(...m);
					},
					removeEventListener(...m) {
						h.removeEventListener(...m);
					},
					postMessage(...m) {
						d.frame.postMessage(...m);
					},
				},
				y = (m) => {
					m.source === d.frame &&
						((d.loaded = !0),
						e.removeEventListener("message", y),
						d.dispatchEvent(new Event("load")));
				};
			return e.addEventListener("message", y), d;
		}
		try {
			new Response(new ReadableStream()),
				o && !("serviceWorker" in navigator) && (l = !0);
		} catch {
			l = !0;
		}
		r(() => {
			const { readable: i } = new TransformStream(),
				n = new MessageChannel();
			n.port1.postMessage(i, [i]),
				n.port1.close(),
				n.port2.close(),
				(s = !0),
				Object.defineProperty(f, "TransformStream", {
					configurable: !1,
					writable: !1,
					value: TransformStream,
				});
		});
		function c() {
			t || (t = o ? b(f.mitm) : x(f.mitm));
		}
		function v(i, n, h) {
			let d = {
					size: null,
					pathname: null,
					writableStrategy: void 0,
					readableStrategy: void 0,
				},
				y = 0,
				m = null,
				u = null,
				L = null;
			if (
				(Number.isFinite(n)
					? (([h, n] = [n, h]),
					  console.warn(
							"[StreamSaver] Deprecated pass an object as 2nd argument when creating a write stream"
					  ),
					  (d.size = h),
					  (d.writableStrategy = n))
					: n && n.highWaterMark
					? (console.warn(
							"[StreamSaver] Deprecated pass an object as 2nd argument when creating a write stream"
					  ),
					  (d.size = h),
					  (d.writableStrategy = n))
					: (d = n || {}),
				!l)
			) {
				c(),
					(u = new MessageChannel()),
					(i = encodeURIComponent(i.replace(/\//g, ":"))
						.replace(/['()]/g, escape)
						.replace(/\*/g, "%2A"));
				const w = {
					transferringReadable: s,
					pathname: d.pathname || Math.random().toString().slice(-6) + "/" + i,
					headers: {
						"Content-Type": "application/octet-stream; charset=utf-8",
						"Content-Disposition": "attachment; filename*=UTF-8''" + i,
					},
				};
				d.size && (w.headers["Content-Length"] = d.size);
				const E = [w, "*", [u.port2]];
				if (s) {
					const S =
						g === "iframe"
							? void 0
							: {
									// This transformer & flush method is only used by insecure context.
									transform(P, W) {
										if (!(P instanceof Uint8Array))
											throw new TypeError("Can only write Uint8Arrays");
										(y += P.length),
											W.enqueue(P),
											m && ((location.href = m), (m = null));
									},
									flush() {
										m && (location.href = m);
									},
							  };
					L = new f.TransformStream(S, d.writableStrategy, d.readableStrategy);
					const I = L.readable;
					u.port1.postMessage({ readableStream: I }, [I]);
				}
				(u.port1.onmessage = (S) => {
					S.data.download
						? g === "navigate"
							? (t.remove(),
							  (t = null),
							  y ? (location.href = S.data.download) : (m = S.data.download))
							: (t.isPopup &&
									(t.remove(), (t = null), g === "iframe" && b(f.mitm)),
							  b(S.data.download))
						: S.data.abort &&
						  ((T = []),
						  u.port1.postMessage("abort"),
						  (u.port1.onmessage = null),
						  u.port1.close(),
						  u.port2.close(),
						  (u = null));
				}),
					t.loaded
						? t.postMessage(...E)
						: t.addEventListener(
								"load",
								() => {
									t.postMessage(...E);
								},
								{ once: !0 }
						  );
			}
			let T = [];
			return (
				(!l && L && L.writable) ||
				new f.WritableStream(
					{
						write(w) {
							if (!(w instanceof Uint8Array))
								throw new TypeError("Can only write Uint8Arrays");
							if (l) {
								T.push(w);
								return;
							}
							u.port1.postMessage(w),
								(y += w.length),
								m && ((location.href = m), (m = null));
						},
						close() {
							if (l) {
								const w = new Blob(T, {
										type: "application/octet-stream; charset=utf-8",
									}),
									E = document.createElement("a");
								(E.href = URL.createObjectURL(w)), (E.download = i), E.click();
							} else u.port1.postMessage("end");
						},
						abort() {
							(T = []),
								u.port1.postMessage("abort"),
								(u.port1.onmessage = null),
								u.port1.close(),
								u.port2.close(),
								(u = null);
						},
					},
					d.writableStrategy
				)
			);
		}
		return f;
	});
})(z);
const H = C,
	A = async () => {
		console.log("WEnter in save File");
		const a = document.getElementById("canvas-for-print");
		return new Promise((e, t) => {
			a.toBlob((s) => {
				const r = new Blob([s], { type: "image/png" }),
					p = H.createWriteStream("sample.png", {
						size: r.size,
						// Makes the percentage visiable in the download
					}),
					o = r.stream();
				if (window.WritableStream && o.pipeTo)
					return o.pipeTo(p).then(() => {
						e(), console.log("it's done");
					});
				(window.writer = p.getWriter()), o.getReader();
			});
		});
	},
	M = [
		{ unit: "mm", multipleToInches: 25.4, label: "millimeters" },
		{ unit: "cm", multipleToInches: 2.54, label: "centimeters" },
		{ unit: "dm", multipleToInches: 0.254, label: "decimeters" },
		{ unit: "m", multipleToInches: 0.0254, label: "meters" },
		{ unit: "in", multipleToInches: 1, label: "inches" },
	],
	F = ({ unit: a, width: e, height: t, ppi: s, ratio: r }) => {
		let p = 1;
		for (let o in M)
			if (a == M[o].unit) {
				p = M[o].multipleToInches;
				break;
			}
		return (e = (e / p) * s), (t = (t / p) * s), (r = e / t), [e, t, r];
	},
	U = (a, e) => {
		const t = getComputedStyle(e),
			s = parseFloat(t.width);
		let r = parseFloat(t.height);
		const p = window.innerWidth,
			o = window.innerHeight;
		r == 0 &&
			((e.style.height = window.innerHeight + "px"),
			(e.style.overflowY = "hidden"),
			(r = e.offsetHeight)),
			j();
		let l, g;
		return (
			(g = Math.min(o, r)),
			(l = g * a),
			l > p && ((l = Math.min(p, s)), (g = l / a)),
			{ width: l, height: g }
		);
	},
	j = () => {
		(document.body.style.minHeight = window.innerHeight),
			(document.body.style.minWidth = window.innerWidth);
	},
	B = (a = { width, height, CANVASP, container, unit, ppi, ratio }) => {
		let e = { ...a, widthInPixels: 0, heightInPixels: 0 };
		const t = e.CANVASP,
			s = () => {
				const l = r();
				(t.width = e.widthInPixels),
					(t.height = e.heightInPixels),
					(t.style.width = l.width + "px"),
					(t.style.height = l.height + "px");
			},
			r = () => (
				([e.widthInPixels, e.heightInPixels, e.ratio] = F({
					...e,
				})),
				U(e.ratio, e.container)
			);
		return {
			init: () => {},
			setSize: s,
			getCanvasSize: () => ({
				width: e.widthInPixels,
				height: e.heightInPixels,
			}),
		};
	},
	R = {
		//Size
		elem: document.createElement("canvas"),
		width: 210,
		height: 297,
		ppi: 300,
		widthInPixels: null,
		heightInPixels: null,
		unit: "mm",
		ratio: null,
		//container options
		container: document.body,
		id: "canvas-for-print",
		pixelDensity: window.devicePixelRatio,
		context: "2d",
		//options
		bleeds: !1,
	};
const k = () => {
		const a = document.createElement("div"),
			e = document.createElement("button"),
			t = document.createElement("div"),
			s = document.createElement("button");
		let r = !1;
		r && a.classList.add("hide");
		const p = () => {
				e.addEventListener("click", x),
					e.addEventListener("mouseenter", l),
					e.addEventListener("mouseleave", g);
			},
			o = () => {
				document.body.appendChild(a),
					a.appendChild(t),
					a.appendChild(e),
					a.appendChild(s),
					e.setAttribute("id", "canvaspdflib_gui-display-button"),
					a.setAttribute("id", "gui-container"),
					t.setAttribute("id", "canvaspdflib_gui-infos-container"),
					s.setAttribute("id", "canvaspdflib_gui-save-button"),
					(e.innerHTML = "<div><p>open</p></div>"),
					(s.innerHTML = "<p>save</p>"),
					p();
			},
			l = () => {
				r && a.classList.add("canvaspdflib_button-is-hover");
			},
			g = () => {
				if (r) {
					const c = document.getElementsByClassName(
						"canvaspdflib_button-is-hover"
					);
					if ((console.log(c.length), c.length > 0))
						for (let v in c)
							typeof c[v] == "object" &&
								(console.log(c[v]),
								c[v].classList.remove("canvaspdflib_button-is-hover"));
				}
			},
			f = ({ ...c }) => {
				console.log(c.width), b(c);
			},
			b = (c) => {
				(t.innerHTML =
					"<p> " +
					c.width +
					" " +
					c.unit +
					" × " +
					c.height +
					" " +
					c.unit +
					"<br/>" +
					c.ppi +
					" ppi</p>"),
					console.log(c);
			},
			x = () => {
				r
					? (a.classList.remove("hide"),
					  setTimeout(() => {
							e.innerHTML = "<div><p>close</p></div>";
					  }, 250))
					: (setTimeout(() => {
							e.innerHTML = "<div><p>open</p></div>";
					  }, 250),
					  a.classList.add("hide")),
					(r = !r);
			};
		return o(), { init: o, update: f, saveButton: s };
	},
	D = (a) => {
		let e = { ...R, ...a };
		const t = e.elem,
			s = k(),
			r = s.saveButton,
			p = t.getContext(e.context),
			o = [],
			l = (i, n) => (
				o[i] || (o[i] = []),
				o[i].push(n),
				() => {
					o[i] = o[i].filter((h) => n !== h);
				}
			),
			g = (i, n) => {
				const h = o[i];
				h &&
					h.forEach((d) => {
						d.call(null, n);
					}),
					console.log(o);
			},
			f = B({
				width: e.width,
				height: e.height,
				unit: e.unit,
				ppi: e.ppi,
				ratio: e.ratio,
				CANVASP: t,
				container: e.container,
			}),
			b = () => {
				r.addEventListener("click", x);
			},
			x = async () => {
				g("startSaving", "hello"), await A(), g("saved", "hello");
			},
			c = () => {
				f.setSize();
				const { width: i, height: n } = f.getCanvasSize();
				return (
					(e.widthInPixels = i),
					(e.heightInPixels = n),
					v(),
					s.init(),
					s.update({ ...e }),
					b(),
					{ ...e }
				);
			},
			v = () => {
				(t.id = e.id), e.container.appendChild(t);
			};
		return (
			(window.onresize = () => {
				f.setSize();
				const { width: i, height: n } = f.getCanvasSize();
				(e.widthInPixels = i), (e.heightInPixels = n), s.update({ ...e });
			}),
			c(),
			{
				...e,
				on: l,
				ctx: p,
			}
		);
	};
const canvasForPrint = D;
