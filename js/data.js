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
		errorElement.querySelector(".error__title").textContent = errorMessage;
		const errorButtons = errorElement.querySelectorAll(".error__button");
		
		errorButtons.forEach((button) => {
			window.utils.hideElement(button);
		});

		main.appendChild(errorElement);

		const hideError = () => {
			removeHandlersOnTemplate();
			main.removeChild(errorElement);
		}

		const handleHideTemplateClick = () => {
			hideError();
		}

		const handleHideTemplateKeyDown = (downEvt) => {
			window.utils.isEscapeEvent(downEvt, () => {
				hideError();
			});
		}

		const setHandlersOnTemplate = () => {
			errorElement.addEventListener("click", handleHideTemplateClick);
			document.addEventListener("keydown", handleHideTemplateKeyDown);
		}

		const removeHandlersOnTemplate = () => {
			errorElement.removeEventListener("click", handleHideTemplateClick);
			document.removeEventListener("keydown", handleHideTemplateKeyDown);
		}

		setHandlersOnTemplate();
	}

	window.backend.getData(handleLoad, handleError);
})()