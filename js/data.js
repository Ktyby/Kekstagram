"use strict";

(() => {
	const handleLoad = (data) => {
		window.data = data;
		window.renderAllPictures();
	}

	const handleError = (errorMessage) => {
		const main = document.querySelector("main");
		const errorTemplate = document.querySelector("#error").content.querySelector(".error");

		const errorElement = errorTemplate.cloneNode(true);
		
		const errorButtons = errorElement.querySelector(".error__buttons");

		errorElement.querySelector(".error__title").textContent = errorMessage;
		
		window.utils.hideElement(errorButtons);

		main.appendChild(errorElement);

		const hideError = () => {
			removeErrorModalHandlers();
			main.removeChild(errorElement);
		}

		const handleHideErrorClick = () => {
			hideError();
		}

		const handleHideErrorKeyDown = (downEvt) => {
			window.utils.isEscapeEvent(downEvt, () => {
				hideError();
			});
		}

		const setErrorModalHandlers = () => {
			errorElement.addEventListener("click", handleHideErrorClick);
			document.addEventListener("keydown", handleHideErrorKeyDown);
		}

		const removeErrorModalHandlers = () => {
			errorElement.removeEventListener("click", handleHideErrorClick);
			document.removeEventListener("keydown", handleHideErrorKeyDown);
		}

		setErrorModalHandlers();
	}

	window.backend.getData(handleLoad, handleError);
})()