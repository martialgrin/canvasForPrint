!(function (e, t) {
	"object" == typeof exports && "object" == typeof module
		? (module.exports = t())
		: "function" == typeof define && define.amd
		? define([], t)
		: "object" == typeof exports
		? (exports.canvasForPrint = t())
		: (e.canvasForPrint = t());
})(this, () =>
	(() => {
		var e = {
				390: function (e) {
					var t;
					(t = () => {
						"use strict";
						const e = "object" == typeof window ? window : this;
						e.HTMLElement ||
							console.warn(
								"streamsaver is meant to run on browsers main thread"
							);
						let t = null,
							n = !1;
						const i = e.WebStreamsPolyfill || {},
							a = e.isSecureContext;
						let o =
							/constructor/i.test(e.HTMLElement) ||
							!!e.safari ||
							!!e.WebKitPoint;
						const r =
								a || "MozAppearance" in document.documentElement.style
									? "iframe"
									: "navigate",
							s = {
								createWriteStream: function (i, d, c) {
									let p = {
											size: null,
											pathname: null,
											writableStrategy: void 0,
											readableStrategy: void 0,
										},
										h = 0,
										m = null,
										u = null,
										g = null;
									if (
										(Number.isFinite(d)
											? (([c, d] = [d, c]),
											  console.warn(
													"[StreamSaver] Deprecated pass an object as 2nd argument when creating a write stream"
											  ),
											  (p.size = c),
											  (p.writableStrategy = d))
											: d && d.highWaterMark
											? (console.warn(
													"[StreamSaver] Deprecated pass an object as 2nd argument when creating a write stream"
											  ),
											  (p.size = c),
											  (p.writableStrategy = d))
											: (p = d || {}),
										!o)
									) {
										t ||
											(t = a
												? l(s.mitm)
												: (function (t) {
														const n = document.createDocumentFragment(),
															i = {
																frame: e.open(
																	t,
																	"popup",
																	"width=200,height=100"
																),
																loaded: !1,
																isIframe: !1,
																isPopup: !0,
																remove() {
																	i.frame.close();
																},
																addEventListener(...e) {
																	n.addEventListener(...e);
																},
																dispatchEvent(...e) {
																	n.dispatchEvent(...e);
																},
																removeEventListener(...e) {
																	n.removeEventListener(...e);
																},
																postMessage(...e) {
																	i.frame.postMessage(...e);
																},
															},
															a = (t) => {
																t.source === i.frame &&
																	((i.loaded = !0),
																	e.removeEventListener("message", a),
																	i.dispatchEvent(new Event("load")));
															};
														return e.addEventListener("message", a), i;
												  })(s.mitm)),
											(u = new MessageChannel()),
											(i = encodeURIComponent(i.replace(/\//g, ":"))
												.replace(/['()]/g, escape)
												.replace(/\*/g, "%2A"));
										const o = {
											transferringReadable: n,
											pathname:
												p.pathname ||
												Math.random().toString().slice(-6) + "/" + i,
											headers: {
												"Content-Type":
													"application/octet-stream; charset=utf-8",
												"Content-Disposition":
													"attachment; filename*=UTF-8''" + i,
											},
										};
										p.size && (o.headers["Content-Length"] = p.size);
										const d = [o, "*", [u.port2]];
										if (n) {
											const e =
												"iframe" === r
													? void 0
													: {
															transform(e, t) {
																if (!(e instanceof Uint8Array))
																	throw new TypeError(
																		"Can only write Uint8Arrays"
																	);
																(h += e.length),
																	t.enqueue(e),
																	m && ((location.href = m), (m = null));
															},
															flush() {
																m && (location.href = m);
															},
													  };
											g = new s.TransformStream(
												e,
												p.writableStrategy,
												p.readableStrategy
											);
											const t = g.readable;
											u.port1.postMessage({ readableStream: t }, [t]);
										}
										(u.port1.onmessage = (e) => {
											e.data.download
												? "navigate" === r
													? (t.remove(),
													  (t = null),
													  h
															? (location.href = e.data.download)
															: (m = e.data.download))
													: (t.isPopup &&
															(t.remove(),
															(t = null),
															"iframe" === r && l(s.mitm)),
													  l(e.data.download))
												: e.data.abort &&
												  ((w = []),
												  u.port1.postMessage("abort"),
												  (u.port1.onmessage = null),
												  u.port1.close(),
												  u.port2.close(),
												  (u = null));
										}),
											t.loaded
												? t.postMessage(...d)
												: t.addEventListener(
														"load",
														() => {
															t.postMessage(...d);
														},
														{ once: !0 }
												  );
									}
									let w = [];
									return (
										(!o && g && g.writable) ||
										new s.WritableStream(
											{
												write(e) {
													if (!(e instanceof Uint8Array))
														throw new TypeError("Can only write Uint8Arrays");
													o
														? w.push(e)
														: (u.port1.postMessage(e),
														  (h += e.length),
														  m && ((location.href = m), (m = null)));
												},
												close() {
													if (o) {
														const e = new Blob(w, {
																type: "application/octet-stream; charset=utf-8",
															}),
															t = document.createElement("a");
														(t.href = URL.createObjectURL(e)),
															(t.download = i),
															t.click();
													} else u.port1.postMessage("end");
												},
												abort() {
													(w = []),
														u.port1.postMessage("abort"),
														(u.port1.onmessage = null),
														u.port1.close(),
														u.port2.close(),
														(u = null);
												},
											},
											p.writableStrategy
										)
									);
								},
								WritableStream: e.WritableStream || i.WritableStream,
								supported: !0,
								version: { full: "2.0.5", major: 2, minor: 0, dot: 5 },
								mitm: "https://jimmywarting.github.io/StreamSaver.js/mitm.html?version=2.0.0",
							};
						function l(e) {
							if (!e) throw new Error("meh");
							const t = document.createElement("iframe");
							return (
								(t.hidden = !0),
								(t.src = e),
								(t.loaded = !1),
								(t.name = "iframe"),
								(t.isIframe = !0),
								(t.postMessage = (...e) => t.contentWindow.postMessage(...e)),
								t.addEventListener(
									"load",
									() => {
										t.loaded = !0;
									},
									{ once: !0 }
								),
								document.body.appendChild(t),
								t
							);
						}
						try {
							new Response(new ReadableStream()),
								a && !("serviceWorker" in navigator) && (o = !0);
						} catch (e) {
							o = !0;
						}
						return (
							((e) => {
								try {
									(() => {
										const { readable: e } = new TransformStream(),
											t = new MessageChannel();
										t.port1.postMessage(e, [e]),
											t.port1.close(),
											t.port2.close(),
											(n = !0),
											Object.defineProperty(s, "TransformStream", {
												configurable: !1,
												writable: !1,
												value: TransformStream,
											});
									})();
								} catch (e) {}
							})(),
							s
						);
					}),
						(e.exports = t());
				},
			},
			t = {};
		function n(i) {
			var a = t[i];
			if (void 0 !== a) return a.exports;
			var o = (t[i] = { exports: {} });
			return e[i].call(o.exports, o, o.exports, n), o.exports;
		}
		(n.d = (e, t) => {
			for (var i in t)
				n.o(t, i) &&
					!n.o(e, i) &&
					Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
		}),
			(n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
			(n.r = (e) => {
				"undefined" != typeof Symbol &&
					Symbol.toStringTag &&
					Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
					Object.defineProperty(e, "__esModule", { value: !0 });
			});
		var i = {};
		return (
			(() => {
				"use strict";
				n.r(i), n.d(i, { canvasForPrint: () => s });
				const e = [
						{ unit: "mm", multipleToInches: 25.4, label: "millimeters" },
						{ unit: "cm", multipleToInches: 2.54, label: "centimeters" },
						{ unit: "dm", multipleToInches: 0.254, label: "decimeters" },
						{ unit: "m", multipleToInches: 0.0254, label: "meters" },
						{ unit: "in", multipleToInches: 1, label: "inches" },
					],
					t = (e, t) => {
						const n = getComputedStyle(t),
							i = parseFloat(n.width);
						let a = parseFloat(n.height);
						const o = window.innerWidth,
							r = window.innerHeight;
						let s, l;
						return (
							0 == a &&
								((t.style.height = window.innerHeight + "px"),
								(t.style.overflowY = "hidden"),
								(a = t.offsetHeight)),
							(document.body.style.minHeight = window.innerHeight),
							(document.body.style.minWidth = window.innerWidth),
							(l = Math.min(r, a)),
							(s = l * e),
							s > o && ((s = Math.min(o, i)), (l = s / e)),
							{ width: s, height: l }
						);
					},
					a = (
						n = { width, height, CANVASP: a, container, unit, ppi, ratio }
					) => {
						let i = { ...n, widthInPixels: 0, heightInPixels: 0 };
						const a = i.CANVASP;
						return {
							init: () => {},
							setSize: () => {
								const n =
									(([i.widthInPixels, i.heightInPixels, i.ratio] = (({
										unit: t,
										width: n,
										height: i,
										ppi: a,
										ratio: o,
									}) => {
										let r = 1;
										for (let n in e)
											if (t == e[n].unit) {
												r = e[n].multipleToInches;
												break;
											}
										return [(n = (n / r) * a), (i = (i / r) * a), n / i];
									})({ ...i })),
									t(i.ratio, i.container));
								(a.width = i.widthInPixels),
									(a.height = i.heightInPixels),
									(a.style.width = n.width + "px"),
									(a.style.height = n.height + "px");
							},
							getCanvasSize: () => ({
								width: i.widthInPixels,
								height: i.heightInPixels,
							}),
						};
					},
					o = {
						p5Mode: !1,
						elem: document.createElement("canvas"),
						width: 210,
						height: 297,
						ppi: 300,
						widthInPixels: null,
						heightInPixels: null,
						unit: "mm",
						ratio: null,
						mode: "picture",
						container: document.body,
						id: "canvas-for-print",
						pixelDensity: window.devicePixelRatio,
						context: "2d",
						bleeds: !1,
					};
				n(390);
				const r = () => {
						const e = document.createElement("div"),
							t = document.createElement("button"),
							n = document.createElement("div"),
							i = document.createElement("button");
						let a = !1;
						a && e.classList.add("hide");
						const o = () => {
								document.body.appendChild(e),
									e.appendChild(n),
									e.appendChild(t),
									e.appendChild(i),
									t.setAttribute("id", "canvaspdflib_gui-display-button"),
									e.setAttribute("id", "gui-container"),
									n.setAttribute("id", "canvaspdflib_gui-infos-container"),
									i.setAttribute("id", "canvaspdflib_gui-save-button"),
									(t.innerHTML = "<div><p>open</p></div>"),
									(i.innerHTML = "<p>save</p>"),
									t.addEventListener("click", l),
									t.addEventListener("mouseenter", r),
									t.addEventListener("mouseleave", s);
							},
							r = () => {
								a && e.classList.add("canvaspdflib_button-is-hover");
							},
							s = () => {
								if (a) {
									const e = document.getElementsByClassName(
										"canvaspdflib_button-is-hover"
									);
									if (e.length > 0)
										for (let t in e)
											"object" == typeof e[t] &&
												e[t].classList.remove("canvaspdflib_button-is-hover");
								}
							},
							l = () => {
								a
									? (e.classList.remove("hide"),
									  setTimeout(() => {
											t.innerHTML = "<div><p>close</p></div>";
									  }, 250))
									: (setTimeout(() => {
											t.innerHTML = "<div><p>open</p></div>";
									  }, 250),
									  e.classList.add("hide")),
									(a = !a);
							};
						return (
							o(),
							{
								init: o,
								update: ({ ...e }) => {
									((e) => {
										n.innerHTML =
											"<p> " +
											e.width +
											" " +
											e.unit +
											" × " +
											e.height +
											" " +
											e.unit +
											"<br/>" +
											e.ppi +
											" ppi</p>";
									})(e);
								},
								saveButton: i,
							}
						);
					},
					s = (e) => {
						let t = { ...o, ...e };
						const n = t.elem,
							i = r(),
							s = i.saveButton,
							l = n.getContext(t.context),
							d = [],
							c = (e, t) => {
								const n = d[e];
								n &&
									n.forEach((e) => {
										e.call(null, t);
									}),
									console.log(d);
							},
							p = a({
								width: t.width,
								height: t.height,
								unit: t.unit,
								ppi: t.ppi,
								ratio: t.ratio,
								CANVASP: n,
								container: t.container,
							}),
							h = async () => {
								c("startSaving", "hello"),
									await saveFile(),
									c("saved", "hello");
							};
						return (
							(window.onresize = () => {
								p.setSize();
								const { width: e, height: n } = p.getCanvasSize();
								(t.widthInPixels = e),
									(t.heightInPixels = n),
									i.update({ ...t });
							}),
							(() => {
								p.setSize();
								const { width: e, height: a } = p.getCanvasSize();
								(t.widthInPixels = e),
									(t.heightInPixels = a),
									(n.id = t.id),
									t.container.appendChild(n),
									i.init(),
									i.update({ ...t }),
									s.addEventListener("click", h);
							})(),
							{
								...t,
								on: (e, t) => (
									d[e] || (d[e] = []),
									d[e].push(t),
									() => {
										d[e] = d[e].filter((e) => t !== e);
									}
								),
								ctx: l,
							}
						);
					};
			})(),
			i
		);
	})()
);
//# sourceMappingURL=my-library.js.map
