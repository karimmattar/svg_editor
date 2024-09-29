var draw = null;
var selectedText = null;
var selectedImage = null;
var selectedRect = null;
var selectedPath = null;
var selectedCircle = null;

document.getElementById("clear").onclick = (e) => {
	e.preventDefault();
	selectedText = null;
	draw = null;
	document.getElementById("editor-viewer").innerHTML = "";
	document.getElementById('text-control').reset();
	document.getElementById("url").value = "";
}

document.getElementById("load").onclick = function(e) {
	e.preventDefault();
	let url = document.getElementById("url").value;
	axios.get(url, {
		headers: {
			"Content-Type": "image/svg+xml",
		},
		responseType: "text",
	})
	.then((response) => {
		const parser = new DOMParser();
        const svgDocument = parser.parseFromString(response.data, "image/svg+xml");
        const svgElement = svgDocument.querySelector("svg");
        const viewBox = svgElement.getAttribute("viewBox");
        const defaultViewBox = "0 0 1080 1080";
		draw = SVG().addTo('#editor-viewer')
		if (viewBox) {
			draw.viewbox(viewBox);
		} else {
			draw.viewbox(defaultViewBox);
		}
		draw.svg(response.data)
	})
	.catch((err) => console.log(err))
	.finally(() => {
		// tspan only
		const tspanElements = draw.find('tspan');
		tspanElements.each(function () {
			this.draggable();
			this.click(function () {
				selectedText = this;
				const computedStyle = getComputedStyle(this.node);
				let fontSize = this.attr('font-size');
				if (fontSize === undefined) {
					fontSize = computedStyle.fontSize;
				}
				let fill = this.attr('fill');
				if (fill === undefined || fill === '#000000') {
					fill = computedStyle.fill;
				}
				let weight = this.attr('font-weight');
				if (weight === undefined) {
					weight = computedStyle.fontWeight;
				}
				document.getElementById('original-text').value = this.text();
				document.getElementById('font-size').value = fontSize;
				document.getElementById('fill-text').value = fill;
				document.getElementById('font-weight').value = weight;
			});
		});
		// text all
		const textElements = draw.find('text');
		textElements.each(function () {
			this.draggable();
			this.click(function () {
				selectedText = this;
				const computedStyle = getComputedStyle(this.node);
				let fontSize = this.attr('font-size');
				if (fontSize === undefined) {
					fontSize = computedStyle.fontSize;
				}
				let fill = this.attr('fill');
				if (fill === undefined || fill === '#000000') {
					fill = computedStyle.fill;
				}
				let weight = this.attr('font-weight');
				if (weight === undefined) {
					weight = computedStyle.fontWeight;
				}
				document.getElementById('original-text').value = this.text();
				document.getElementById('font-size').value = fontSize;
				document.getElementById('fill-text').value = fill;
				document.getElementById('font-weight').value = weight;
			});
		});
		// images
		const imageElements = draw.find('image')
		imageElements.each(function () {
			this.draggable();
			this.click(function () {
				selectedImage = this;
				const computedStyle = getComputedStyle(this.node);
				let width = this.attr('width');
				if (width === undefined) {
					width = computedStyle.width;
				}
				let height = this.attr('height');
				if (height === undefined) {
					height = computedStyle.height;
				}
				document.getElementById('image-width').value = width;
				document.getElementById('image-height').value = height;
			});
		});
		// rects
		const rectElements = draw.find('rect')
		rectElements.each(function () {
			this.draggable();
			this.click(function () {
				selectedRect = this;
				const computedStyle = getComputedStyle(this.node);
				let width = this.attr('width');
				if (width === undefined) {
					width = computedStyle.width;
				}
				let height = this.attr('height');
				if (height === undefined) {
					height = computedStyle.height;
				}
				let fill = this.attr('fill');
				if (fill === undefined || fill === '#000000') {
					fill = computedStyle.fill;
				}
				let rx = this.attr('rx');
				if (rx === undefined) {
					rx = computedStyle.rx;
				}
				let ry = this.attr('ry');
				if (ry === undefined) {
					ry = computedStyle.ry;
				}
				document.getElementById('rect-width').value = width;
				document.getElementById('rect-height').value = height;
				document.getElementById('rect-fill').value = fill;
				document.getElementById('rect-rx').value = rx;
				document.getElementById('rect-ry').value = ry;
			});
		});
		// paths
		const pathElement = draw.find('path')
		pathElement.each(function () {
			this.draggable();
			// var polygon = this.toPoly();
			// console.log(polygon);
			this.click(function () {
				selectedPath = this;
				const computedStyle = getComputedStyle(this.node);
				let width = this.attr('width');
				if (width === undefined) {
					width = computedStyle.width;
				}
				let height = this.attr('height');
				if (height === undefined) {
					height = computedStyle.height;
				}
				let fill = this.attr('fill');
				if (fill === undefined || fill === '#000000') {
					fill = computedStyle.fill;
				}
				let rx = this.attr('rx');
				if (rx === undefined) {
					rx = computedStyle.rx;
				}
				let ry = this.attr('ry');
				if (ry === undefined) {
					ry = computedStyle.ry;
				}
				document.getElementById('path-width').value = width;
				document.getElementById('path-height').value = height;
				document.getElementById('path-fill').value = fill;
				document.getElementById('path-rx').value = rx;
				document.getElementById('path-ry').value = ry;
			});
		});
		// Circles
		const circleElements = draw.find('circle')
		circleElements.each(function () {
			this.draggable();
			this.click(function () {
				selectedCircle = this;
				const computedStyle = getComputedStyle(this.node);
				let cx = this.attr('cx');
				if (cx === undefined) {
					cx = computedStyle.cx;
				}
				let cy = this.attr('cy');
				if (cy === undefined) {
					cy = computedStyle.cy;
				}
				let fill = this.attr('fill');
				if (fill === undefined || fill === '#000000') {
					fill = computedStyle.fill;
				}
				let r = this.attr('r');
				if (r === undefined) {
					r = computedStyle.r;
				}
				document.getElementById('circle-cx').value = cx;
				document.getElementById('circle-cy').value = cy;
				document.getElementById('circle-fill').value = fill;
				document.getElementById('circle-r').value = r;
			});
		});
	})
}

document.getElementById('text-control').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Check if a text element is selected
    if (selectedText) {
        selectedText.text(document.getElementById('original-text').value); // Update text

        const newFontSize = document.getElementById('font-size').value;
        const newColor = document.getElementById('fill-text').value;
        const newWeight = document.getElementById('font-weight').value;

        selectedText.node.style.setProperty('font-size', newFontSize, 'important');
        selectedText.node.style.setProperty('fill', newColor, 'important');
        selectedText.node.style.setProperty('font-weight', newWeight, 'important');
    }

    // selectedText = null;
    // document.getElementById('text-control').reset();
});

document.getElementById('image-control').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    if (selectedImage) {
        const width = document.getElementById('image-width').value;
		const height = document.getElementById('image-height').value;

        selectedImage.node.style.setProperty('width', width, 'important');
		selectedImage.node.style.setProperty('height', height, 'important');
    }

    // selectedImage = null;
    // document.getElementById('image-control').reset();
});

document.getElementById('rect-control').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    if (selectedRect) {
        const width = document.getElementById('rect-width').value;
		const height = document.getElementById('rect-height').value;
		const fill = document.getElementById('rect-fill').value;
		const rx = document.getElementById('rect-rx').value;
		const ry = document.getElementById('rect-ry').value;

        selectedRect.node.style.setProperty('width', width, 'important');
		selectedRect.node.style.setProperty('height', height, 'important');
		selectedRect.node.style.setProperty('fill', fill, 'important');
		selectedRect.node.style.setProperty('rx', rx, 'important');
		selectedRect.node.style.setProperty('ry', ry, 'important');
    }

    // selectedRect = null;
    // document.getElementById('rect-control').reset();
});

document.getElementById('path-control').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    if (selectedPath) {
        const width = document.getElementById('path-width').value;
		const height = document.getElementById('path-height').value;
		const fill = document.getElementById('path-fill').value;
		const rx = document.getElementById('path-rx').value;
		const ry = document.getElementById('path-ry').value;

        selectedPath.node.style.setProperty('width', width, 'important');
		selectedPath.node.style.setProperty('height', height, 'important');
		selectedPath.node.style.setProperty('fill', fill, 'important');
		selectedPath.node.style.setProperty('rx', rx, 'important');
		selectedPath.node.style.setProperty('ry', ry, 'important');
    }

    // selectedPath = null;
    // document.getElementById('path-control').reset();
});

document.getElementById('circle-control').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    if (selectedCircle) {
        const cx = document.getElementById('circle-cx').value;
		const cy = document.getElementById('circle-cy').value;
		const fill = document.getElementById('circle-fill').value;
		const r = document.getElementById('circle-r').value;

        selectedCircle.node.style.setProperty('cx', cx, 'important');
		selectedCircle.node.style.setProperty('cy', cy, 'important');
		selectedCircle.node.style.setProperty('fill', fill, 'important');
		selectedCircle.node.style.setProperty('r', r, 'important');
    }

    // selectedCircle = null;
    // document.getElementById('circle-control').reset();
});

document.querySelectorAll('.bring-to-front').forEach(function (elem) {
	elem.addEventListener('click', function(event) {
		if (elem.classList.contains('text-control')) {
			if (selectedText) {
				selectedText.front();
			}
		} else if (elem.classList.contains('image-control')) {
			if (selectedImage) {
				selectedImage.front();
			}
		} else if (elem.classList.contains('rect-control')) {
			if (selectedRect) {
				selectedRect.front();
			}
		} else if (elem.classList.contains('path-control')) {
			if (selectedPath) {
				selectedPath.front();
			}
		} else if (elem.classList.contains('circle-control')) {
			if (selectedCircle) {
				selectedCircle.front();
			}
		}
	});
});

document.querySelectorAll('.send-to-back').forEach(function (elem) {
	elem.addEventListener('click', function(event) {
		if (elem.classList.contains('text-control')) {
			if (selectedText) {
				selectedText.back();
			}
		} else if (elem.classList.contains('image-control')) {
			if (selectedImage) {
				selectedImage.back();
			}
		} else if (elem.classList.contains('rect-control')) {
			if (selectedRect) {
				selectedRect.back();
			}
		} else if (elem.classList.contains('path-control')) {
			if (selectedPath) {
				selectedPath.back();
			}
		} else if (elem.classList.contains('circle-control')) {
			if (selectedCircle) {
				selectedCircle.back();
			}
		}
	});
});

document.querySelectorAll('.forward').forEach(function (elem) {
	elem.addEventListener('click', function(event) {
		if (elem.classList.contains('text-control')) {
			if (selectedText) {
				selectedText.forward();
			}
		} else if (elem.classList.contains('image-control')) {
			if (selectedImage) {
				selectedImage.forward();
			}
		} else if (elem.classList.contains('rect-control')) {
			if (selectedRect) {
				selectedRect.forward();
			}
		} else if (elem.classList.contains('path-control')) {
			if (selectedPath) {
				selectedPath.forward();
			}
		} else if (elem.classList.contains('circle-control')) {
			if (selectedCircle) {
				selectedCircle.forward();
			}
		}
	});
});

document.querySelectorAll('.backword').forEach(function (elem) {
	elem.addEventListener('click', function(event) {
		if (elem.classList.contains('text-control')) {
			if (selectedText) {
				selectedText.backward();
			}
		} else if (elem.classList.contains('image-control')) {
			if (selectedImage) {
				selectedImage.backward();
			}
		} else if (elem.classList.contains('rect-control')) {
			if (selectedRect) {
				selectedRect.backward();
			}
		} else if (elem.classList.contains('path-control')) {
			if (selectedPath) {
				selectedPath.backward();
			}
		} else if (elem.classList.contains('circle-control')) {
			if (selectedCircle) {
				selectedCircle.backward();
			}
		}
	});
});

const extractText = (element) => {
	const computedStyle = getComputedStyle(element.node);
	let fontSize = element.attr('font-size');
	if (fontSize === undefined) {
		fontSize = computedStyle.fontSize;
	}
	let fontFamily = element.attr('font-family');
	if (fontFamily === undefined) {
		fontFamily = computedStyle.fontFamily;
	}
	let fill = element.attr('fill');
	if (fill === undefined || fill === '#000000') {
		fill = computedStyle.fill;
	}
	let weight = element.attr('font-weight');
	if (weight === undefined) {
		weight = computedStyle.fontWeight;
	}
	return {
		type: 'text',
		text: element.text,
		bbox: element.bbox(),
		fontSize: fontSize,
        fontFamily: fontFamily,
		fillColor: fill,
		x: element.bbox().x,
        y: element.bbox().y
	}
}

const createPsd = (layers) => {
	const psd = new PSD();
  
	layers.forEach(async (layerData) => {
	  if (layerData.type === 'text') {
		// Create a text layer in the PSD
		psd.tree().children().push({
		  name: 'Text Layer',
		  type: 'text',
		  text: {
			value: layerData.text,
			font: {
			  name: layerData.fontFamily,
			  sizes: [parseInt(layerData.fontSize, 10)],
			},
			color: layerData.fillColor,
			left: layerData.x,
			top: layerData.y,
		  },
		});
	  } else {
		// Handle non-text elements (shapes, paths, etc.)
		const canvas = await svgToCanvas(layerData.svg, layerData.bbox.width, layerData.bbox.height);
		const imageData = canvas.toDataURL();
  
		psd.tree().children().push({
		  name: 'Shape Layer',
		  top: layerData.bbox.y,
		  left: layerData.bbox.x,
		  image: {
			file: imageData,
		  },
		});
	  }
	});
  
	return psd;
};

const downloadPsd = (psd) => {
	const blob = psd.file();
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = 'exported_file.psd';
	link.click();
};
  

document.querySelector('#export').addEventListener('click', function(event) {
	if (draw) {
		const layers = [];
		draw.children().forEach((element) => {
			element.children().forEach((subElement) => {
				if (subElement.type === 'text') {
					layers.push(extractText(subElement));
				}
			});
		});
		console.log(layers);
	}
});