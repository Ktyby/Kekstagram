"use strict";

(() => {
	const renderAllPictures = () => {
		const picturesContainer = document.querySelector(".pictures");
		const fragment = new DocumentFragment();
		const pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");

		const createPicture = (picture, index) => {
			const image = pictureTemplate.cloneNode(true);
		
			image.querySelector(".picture__comments").textContent = picture.comments.length;
			image.querySelector(".picture__likes").textContent = picture.likes;
			image.querySelector(".picture__img").src = picture.url;
			image.setAttribute("data-number", index);
		
			return image;
		}

		window.data.forEach((picture, index) => {
			fragment.append(createPicture(picture, index));
		});

		picturesContainer.append(fragment);
			
		const miniaturs = document.querySelectorAll(".picture");
		
		const handlePictureClick = (evt) => {
			window.renderBigPicture(getPictureAttribute(evt));
		}

		const handlePictureKeyDown = (downEvt) => {
			window.utils.isEnterEvent(downEvt, (evt) => {
				evt.preventDefault();
				window.renderBigPicture(getPictureAttribute(evt));
			});
		}

		miniaturs.forEach((picture) => {
			picture.addEventListener("click", handlePictureClick);
			picture.addEventListener("keydown", handlePictureKeyDown);
		});
		
		const getPictureAttribute = (evt) => {
			return evt.currentTarget.getAttribute("data-number");
		}
	}

	window.renderAllPictures = renderAllPictures;
})()