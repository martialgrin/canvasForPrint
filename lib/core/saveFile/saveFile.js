import * as StreamSaver from "streamsaver";

export const saveFile = async (fileName) => {
	console.log(StreamSaver);
	console.log("Enter in save File");
	const canvas = document.getElementById("canvas-for-print");
	return new Promise((resolve, reject) => {
		canvas.toBlob((blobCanvas) => {
			// document.body.appendChild(newImg);
			const blob = new Blob([blobCanvas], { type: "image/png" });
			const fileStream = StreamSaver.createWriteStream(fileName + ".png", {
				size: blob.size, // Makes the percentage visiable in the download
			});
			const readableStream = blob.stream();

			// more optimized pipe version
			// (Safari may have pipeTo but it's useless without the WritableStream)
			if (window.WritableStream && readableStream.pipeTo) {
				return readableStream.pipeTo(fileStream).then(() => {
					resolve();
					console.log("it's done");
				});
			}

			// Write (pipe) manually
			window.writer = fileStream.getWriter();

			const reader = readableStream.getReader();
			const pump = () =>
				reader
					.read()
					.then((res) =>
						res.done ? writer.close() : writer.write(res.value).then(pump)
					);

			// pump();
		});
	});
};
