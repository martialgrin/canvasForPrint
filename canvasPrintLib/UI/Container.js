import { saveFile } from "../core/saveFile/saveFile";
import "./style.css";

export const Container = () => {
	const container = document.createElement("div");
	const button = document.createElement("button");
	const infosContainer = document.createElement("div");
	const saveButton = document.createElement("button");
	let isHidden = false;
	if (isHidden) {
		container.classList.add("hide");
	}

	const initListener = () => {
		button.addEventListener("click", onClickHandler);
		button.addEventListener("mouseenter", onMouseEnterHandler);
		button.addEventListener("mouseleave", onMouseLeaveHandler);
	};
	const init = () => {
		document.body.appendChild(container);
		container.appendChild(infosContainer);
		container.appendChild(button);
		container.appendChild(saveButton);
		button.setAttribute("id", "canvaspdflib_gui-display-button");
		container.setAttribute("id", "gui-container");
		infosContainer.setAttribute("id", "canvaspdflib_gui-infos-container");
		saveButton.setAttribute("id", "canvaspdflib_gui-save-button");
		button.innerHTML = "<div><p>open</p></div>";
		saveButton.innerHTML = "<p>save</p>";
		initListener();
	};

	const onMouseEnterHandler = () => {
		isHidden ? container.classList.add("canvaspdflib_button-is-hover") : "";
	};

	const onMouseLeaveHandler = () => {
		if (isHidden) {
			const elems = document.getElementsByClassName(
				"canvaspdflib_button-is-hover"
			);
			console.log(elems.length);
			if (elems.length > 0) {
				for (let elem in elems) {
					if (typeof elems[elem] == "object") {
						console.log(elems[elem]);
						elems[elem].classList.remove("canvaspdflib_button-is-hover");
					}
				}
			}
		}
	};

	const update = ({ ...settings }) => {
		console.log(settings.width);
		display(settings);
	};

	const display = (settings) => {
		infosContainer.innerHTML =
			"<p> " +
			settings.width +
			" " +
			settings.unit +
			" × " +
			settings.height +
			" " +
			settings.unit +
			"<br/>" +
			settings.dpi +
			" dpi</p>";

		console.log(settings);
	};

	const onClickHandler = () => {
		if (isHidden) {
			container.classList.remove("hide");
			setTimeout(() => {
				button.innerHTML = "<div><p>close</p></div>";
			}, 250);
		} else {
			setTimeout(() => {
				button.innerHTML = "<div><p>open</p></div>";
			}, 250);
			container.classList.add("hide");
		}

		isHidden = !isHidden;
	};
	init();

	return { init, update, saveButton };
};
