import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-import-css";

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
			file: "dist/canvas-for-print.cjs.js",
			sourcemap: true,
		},
	],
	plugins: [nodeResolve(), terser(), commonjs(), css()],
};
