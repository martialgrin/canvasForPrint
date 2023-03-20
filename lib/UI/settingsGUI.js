export const settingsGUI = ({ settings, container }) => {
	const settingsContainerArray = [];
	const settingsButton = () => {
		let isOpen = false;
		const button = document.createElement("button");
		button.classList.add("canvas-for-print_gui-inner-container");
		container.appendChild(button);
		button.innerHTML = "<p>settings</p>";
		const initListener = () => {
			button.addEventListener("click", onClickHandler);
			// button.addEventListener("mouseenter", onMouseEnterHandler);
			// button.addEventListener("mouseleave", onMouseLeaveHandler);
		};

		const onClickHandler = () => {
			for (let i in settingsContainerArray) {
				if (isOpen) {
					settingsContainerArray[i].classList.add("canvas-for-print_hide");
				} else {
					settingsContainerArray[i].classList.remove("canvas-for-print_hide");
				}
			}
			isOpen = !isOpen;
		};
		initListener();
	};
	const infos = (val) => {
		settings = { ...val, ...settings };
		createInnerContainer({
			id: "size",
			val:
				settings.width +
				" " +
				settings.unit +
				" × " +
				settings.height +
				" " +
				settings.unit,
		});
		createInnerContainer({
			id: "ppi",
			val: settings.ppi + " ppi",
		});
		createInnerContainer({
			id: "mode",
			val: settings.mode + " mode",
		});
		if (settings.mode === "sequence") {
			createInnerContainer({
				id: "recordingFrames",
				val:
					"frames " +
					settings.recordingFrames.start +
					" to " +
					settings.recordingFrames.end,
			});
		}
	};

	const createInnerContainer = ({ val, id }) => {
		const elem = document.createElement("div");
		// elem.setAttribute("id", "canvas-for-print_gui-infos-container");
		elem.classList.add("canvas-for-print_gui-inner-container");
		elem.classList.add("canvas-for-print_hide");
		elem.innerHTML = "<p>" + val + "</p>";

		container.appendChild(elem);
		settingsContainerArray.push(elem);
	};

	const fileName = () => {
		const fileName = document.createElement("input");
	};

	const pictureOrSequence = (mode) => {
		const button = document.createElement("button");
	};

	const sequenceSettings = () => {
		const sequenceStart = document.createElement("input");
		const sequenceEnd = document.createElement("input");
	};

	const submitButton = (name, fn) => {};

	return { infos, pictureOrSequence, sequenceSettings, settingsButton };
};
