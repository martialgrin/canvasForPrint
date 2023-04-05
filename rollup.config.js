import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import scss from "rollup-plugin-scss";
import minify from "rollup-plugin-minify";
import postcss from "rollup-plugin-postcss";

export default {
	input: ["lib/index.js"],
	output: [
		{
			format: "umd",
			file: "dist/canvas-for-print.umd.js",
			name: "CanvasForPrint",
			globals: {
				streamsaver: "StreamSaver",
			},
			sourcemap: true,
		},
		{
			format: "esm",
			file: "dist/canvas-for-print.esm.js",
			sourcemap: true,
		},
		{
			format: "cjs",
			file: "dist/canvas-for-print.min.js",
			sourcemap: true,
		},
	],
	plugins: [
		nodeResolve(),
		terser(),
		commonjs(),
		scss({ fileName: "bundle.css" }),
		postcss(),

		minify({ iife: "iife.min.js", cjs: "cjs.min.js" }),
	],
};
