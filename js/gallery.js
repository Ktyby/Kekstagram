"use strict";

(() => {
	// Функции работы с миниатюрами //

	const renderAllPictures = () => {
		const picturesContainer = document.querySelector(".pictures");
		const fragment = new DocumentFragment();
		const pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
	
		const createPicture = (picture, index) => {
			const image = pictureTemplate.cloneNode(true);
		
			image.querySelector(".picture__comments").textContent = picture.comments.length;
			image.querySelector(".picture__likes").textContent = picture.likes;
			image.querySelector(".picture__img").src = picture.image;
			image.setAttribute("data-number", index);
		
			return image;
		}
		
		picturesData.forEach((picture, index) => {
			fragment.append(createPicture(picture, index));
		});
	
		picturesContainer.append(fragment);
			
		const miniaturs = document.querySelectorAll(".picture");
	
		miniaturs.forEach((picture) => {
			picture.addEventListener("click", handlePictureClick);
			picture.addEventListener("keydown", handlePictureKeyDown);
		});
	}
	
	const getPictureAttribute = (evt) => {
		return evt.currentTarget.getAttribute("data-number");
	}
	
	const handlePictureClick = (evt) => {
		renderBigPicture(getPictureAttribute(evt));
	}
	
	const handlePictureKeyDown = (downEvt) => {
		isEnterEvent(downEvt, (evt) => {
			evt.preventDefault();
			renderBigPicture(getPictureAttribute(evt));
		});
	}

	renderAllPictures();
})()