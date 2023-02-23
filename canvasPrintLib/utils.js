function saveFile(data, filename, type) {
	var file = new Blob([data], { type: type });
	var a = document.createElement("a"),
		url = URL.createObjectURL(file);
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	setTimeout(function () {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	}, 0);
}

export function extendDefaultParams(defaultParams, newParams, options = {}) {
	const {
		ignoreUndefined = false,
		mergeArrays = false,
		onlyMergeOwnProperties = true,
	} = options;

	for (const key in newParams) {
		if (onlyMergeOwnProperties ? newParams.hasOwnProperty(key) : true) {
			if (typeof newParams[key] === "undefined") {
				if (!ignoreUndefined) {
					defaultParams[key] = newParams[key];
				}
			} else if (newParams[key] instanceof HTMLElement) {
				defaultParams[key] = newParams[key];
			} else if (Array.isArray(newParams[key]) && mergeArrays) {
				defaultParams[key] = defaultParams[key]
					? defaultParams[key].concat(newParams[key])
					: newParams[key];
			} else if (typeof newParams[key] === "object") {
				defaultParams[key] = extendDefaultParams(
					defaultParams[key] || {},
					newParams[key],
					options
				);
			} else {
				defaultParams[key] = newParams[key];
			}
		}
	}
	return defaultParams;
}
