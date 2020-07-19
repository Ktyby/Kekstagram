"use strict";

(() => {
	const handleLoad = (data) => {
		window.data = JSON.parse(data);
		window.renderAllPictures();
	}

	const handleError = (errorMessage) => {
		const main = document.querySelector("main");
		const errorTemplate = document.querySelector("#error").content.querySelector(".error");
		errorTemplate.querySelector(".error__title").textContent = errorMessage;
		const errorButton = errorTemplate.querySelectorAll(".error__button");
		const errorElement = errorTemplate.cloneNode(true);

		main.appendChild(errorElement);

		const hideErrorTemplate = () => {
			removeHideTemplateError();
			main.removeChild(errorElement);
		}

		const handleClickHideTemplate = () => {
			hideErrorTemplate();
		}

		const handleKeyDownHideTemplate = (downEvt) => {
			window.utils.isEscapeEvent(downEvt, () => {
				hideErrorTemplate();
			});
		}

		const setHideTemplateError = () => {
			errorElement.addEventListener("click", handleClickHideTemplate);
			document.addEventListener("keydown", handleKeyDownHideTemplate);
			errorButton.forEach(button => {
				button.addEventListener("click", handleClickHideTemplate);
			});
		}

		const removeHideTemplateError = () => {
			errorElement.removeEventListener("click", handleClickHideTemplate);
			document.removeEventListener("keydown", handleKeyDownHideTemplate);
			errorButton.forEach(button => {
				button.removeEventListener("click", handleClickHideTemplate);
			});
		}

		setHideTemplateError();
	}

	window.backend.getDataFromServer(handleLoad, handleError);
})()