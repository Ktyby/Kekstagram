"use strict";

(() => {
	const main = document.querySelector("main");
	const errorTemplate = document.querySelector("#error").content.querySelector(".error");

	const handleLoad = (data) => {
		window.data = data;
		window.renderAllPictures(window.data);
		window.filtrate([...data]);
	}

	const handleError = (errorMessage) => {
		const errorElement = errorTemplate.cloneNode(true);	
		const errorButtons = errorElement.querySelector(".error__buttons");

		errorElement.querySelector(".error__title").textContent = errorMessage;
		
		window.utils.hideElement(errorButtons);

		main.appendChild(errorElement);

		const hideError = () => {
			errorElement.remove();
			removeErrorModalListeners();
		}

		const handleHideErrorClick = () => {
			hideError();
		}

		const handleHideErrorKeyDown = (downEvt) => {
			window.utils.isEscapeEvent(downEvt, hideError)
		}

		const setErrorModalListeners = () => {
			errorElement.addEventListener("click", handleHideErrorClick);
			document.addEventListener("keydown", handleHideErrorKeyDown);
		}

		const removeErrorModalListeners = () => {
			errorElement.removeEventListener("click", handleHideErrorClick);
			document.removeEventListener("keydown", handleHideErrorKeyDown);
		}

		setErrorModalListeners();
	}

	window.backend.getData(handleLoad, handleError);
})()