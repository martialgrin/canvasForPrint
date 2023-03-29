import CanvasForPrint from "canvas-for-print";
import * as THREE from "three";

window.onload = () => {
	const canvas = CanvasForPrint({
		container: document.getElementById("app"),
		context: "WEBGL",
		width: 100,
		height: 100,
		unit: "cm",
	});
	canvas.create();

	const renderer = new THREE.WebGLRenderer({
		canvas: canvas.elem,
		preserveDrawingBuffer: true,
	});

	const scene = new THREE.Scene(); // Create a Three.js scene object.
	const camera = new THREE.PerspectiveCamera(
		75,
		canvas.widthInPixels / canvas.heightInPixels,
		0.1,
		1000
	); // Define the perspective camera's attributes.

	var geometry = new THREE.BoxGeometry(20, 20, 20); // Create a 20 by 20 by 20 cube.
	var material = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Skin the cube with 100% blue.
	var cube = new THREE.Mesh(geometry, material); // Create a mesh based on the specified geometry (cube) and material (blue skin).
	scene.add(cube); // Add the cube at (0, 0, 0).
	camera.position.z = 50; // Move the camera away from the origin, down the positive z-axis.

	var render = function () {
		cube.rotation.x += 0.01; // Rotate the sphere by a small amount about the x- and y-axes.
		cube.rotation.y += 0.01;

		renderer.render(scene, camera); // Each time we change the position of the cube object, we must re-render it.
		requestAnimationFrame(render); // Call the render() function up to 60 times per second (i.e., up to 60 animation frames per second).
	};

	render(); //
};
