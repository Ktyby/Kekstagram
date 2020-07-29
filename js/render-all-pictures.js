"use strict";

(() => {
	const renderAllPictures = (data) => {
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

		data.forEach((picture, index) => {
			fragment.append(createPicture(picture, index));
		});

		picturesContainer.append(fragment);
			
		const miniaturs = document.querySelectorAll(".picture");

		const showBigPicture = (evt) => {
			window.renderBigPicture(getPictureAttribute(evt));
		}
		
		const handlePictureClick = (evt) => {
			showBigPicture(evt);
		}

		const handlePictureKeyDown = (downEvt) => {
			window.utils.isEnterEvent(downEvt, showBigPicture);
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