export const Container = () => {
	const container = document.createElement("div");

	const initListener = () => {
		container.addEventListener("click", onClickHandler);
	};
	const init = () => {
		document.body.appendChild("container");
	};

	const update = () => {};

	const display = () => {};

	const onClickHandler = () => {};

	return { init, update };
};
