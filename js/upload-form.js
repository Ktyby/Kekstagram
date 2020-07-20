"use strict";

(() => {
	const MIN_SLIDER_VALUE = 0;
	const MAX_SLIDER_VALUE = 100;
	const MAX_HASHTAGS_NUMBER = 5;
	const MAX_HASHTAG_LENGTH = 20;
	const SEPARATOR = "||";

	const Effect = {
		NONE: {
			effectName: "none",
			cssProperty: "none",
			maxValue: null,
			minValue: null,
			unit: ""
		},
		CHROME: {
			effectName: "chrome",
			cssProperty: "grayscale",
			maxValue: 1,
			minValue: 0,
			unit: ""
		},
		SEPIA: {
			effectName: "sepia",
			cssProperty: "sepia",
			maxValue: 1,
			minValue: 0,
			unit: ""
		},
		MARVIN: {
			effectName: "marvin",
			cssProperty: "invert",
			maxValue: 100,
			minValue: 0,
			unit: "%"
		},
		PHOBOS: {
			effectName: "phobos",
			cssProperty: "blur",
			maxValue: 3,
			minValue: 0,
			unit: "px"
		},
		HEAT: {
			effectName: "heat",
			cssProperty: "brightness",
			maxValue: 3,
			minValue: 1,
			unit: ""
		}
	}

	const errorTemplate = document.querySelector("#error").content.querySelector(".error");
	const successTemplate = document.querySelector("#success").content.querySelector(".success");
	const main = document.querySelector("main");
	const form = main.querySelector(".img-upload__form");
	const uploadInput = form.querySelector(".img-upload__input");
	const imageEditor = form.querySelector(".img-upload__overlay");
	const uploadedImage = imageEditor.querySelector(".img-upload__preview img");
	const editorCloseButton = imageEditor.querySelector(".img-upload__cancel");
	const effectsRadio = imageEditor.querySelectorAll(".effects__radio");
	const slider = imageEditor.querySelector(".img-upload__effect-level");
	const effectLine = slider.querySelector(".effect-level__line");
	const pin = effectLine.querySelector(".effect-level__pin");
	const depth = effectLine.querySelector(".effect-level__depth");
	const effectValue = slider.querySelector(".effect-level__value");
	const hashtagsInput = imageEditor.querySelector(".text__hashtags");
	const descriptionInput = imageEditor.querySelector(".text__description");

	let currentEffect = Effect.NONE;

	const handleFileUploadChange = () => {
		window.utils.showElement(imageEditor);
		window.utils.hideElement(slider); 
		
		setEditFormListeners();
	}

	uploadInput.addEventListener("change", handleFileUploadChange);

	const addEffectDataToImage = (currentEffect, filterValue) => { //Добавление эффекта соответственно с настраиваемой насыщенностью
		const getEffectPower = (effect, value) => {
			const percent = (effect.maxValue - effect.minValue) / MAX_SLIDER_VALUE;
			return (percent * value) + effect.minValue;
		}

		uploadedImage.style.filter = `${currentEffect.cssProperty}(${getEffectPower(currentEffect, filterValue)}${currentEffect.unit})`;
		uploadedImage.classList.add(`effects__preview--${currentEffect.effectName}`);
	}

	const setSliderValue = (value) => {
		pin.style.left = `${value}%`;
		depth.style.width = `${value}%`;
		effectValue.setAttribute("value", value);
	}

	const applyEffect = (effectObject) => {
		if (effectObject === "none") {
			window.utils.hideElement(slider);
		} else {
			window.utils.showElement(slider);
		} 

		deleteOldEffectDataFromImage();

		const effect = Effect[effectObject.toUpperCase()];
		uploadedImage.style.filter = `${effect.cssProperty}(${effect.maxValue}${effect.unit})`;
		uploadedImage.classList.add(`effects__preview--${effect.effectName}`);

		currentEffect = effect;

		setSliderValue(MAX_SLIDER_VALUE);
	}

	const handleEffectFocus = (evt) => {
		deleteOldEffectDataFromImage();
		applyEffect(evt.target.value);
	}

	const handlePinMouseDown = (evt) => {
		evt.preventDefault();

		const startCoord = effectLine.getBoundingClientRect().left;

		const handlePinMouseMove = (moveEvt) => {
			setEffectValue(moveEvt);
		}

		const handlePinMouseUp = () => {
			document.removeEventListener("mousemove", handlePinMouseMove);
			document.removeEventListener("mouseup", handlePinMouseUp);
		}

		const setEffectValue = (evt) => {
			let newCoord = evt.pageX - startCoord;
			let sliderLength = effectLine.clientWidth;

			if (newCoord < MIN_SLIDER_VALUE) {
				newCoord = MIN_SLIDER_VALUE;
			}
			if (newCoord > sliderLength) {
				newCoord = sliderLength;
			}

			const pinPosition = newCoord * 100 / sliderLength;
			setSliderValue(pinPosition);
			addEffectDataToImage(currentEffect, pinPosition);
		}

		document.addEventListener("mousemove", handlePinMouseMove);
		document.addEventListener("mouseup", handlePinMouseUp);
	}
	
	const setEditFormListeners = () => {
		editorCloseButton.addEventListener("click", handleImageEditorCloseClick);
		document.addEventListener("keydown", handleImageEditorCloseKeyDown);
		hashtagsInput.addEventListener("input", handleHashtagInput);
		form.addEventListener("submit", handleFormSubmit);
		pin.addEventListener("mousedown", handlePinMouseDown);
		
		effectsRadio.forEach((effect) => {
			effect.addEventListener("focus", handleEffectFocus);
		});
	}

	const handleHashtagInput = (evt) => {    
		hashtagsInput.setCustomValidity("");
		hashtagsInput.setCustomValidity(getFormValidationErrors(evt));
		hashtagsInput.style.borderColor = getFormValidationErrors(evt) ? 'red' : '';
	}

	const clearInput = () => {
		uploadInput.value = "";
		descriptionInput.value = "";
		hashtagsInput.value = "";
		hashtagsInput.style.borderColor = "";
		hashtagsInput.setCustomValidity("");
	}

	const deleteOldEffectDataFromImage = () => {
		uploadedImage.style.filter = "";
		effectValue.removeAttribute("value");
		uploadedImage.classList.remove(`effects__preview--${currentEffect.effectName}`);
	}

	const removeEditFormListeners = () => {
		editorCloseButton.removeEventListener("click", handleImageEditorCloseClick);
		document.removeEventListener("keydown", handleImageEditorCloseKeyDown);
		hashtagsInput.removeEventListener("input", handleHashtagInput);
		form.removeEventListener("submit", handleFormSubmit);
		pin.removeEventListener("mousedown", handlePinMouseDown);
		deleteOldEffectDataFromImage();

		effectsRadio.forEach((effect) => {
			effect.removeEventListener("focus", handleEffectFocus);
		});
	}

	const closeEditForm = () => {
		clearInput();
		window.utils.hideElement(imageEditor);
		removeEditFormListeners();
	}

	const handleFormSubmit = (evt) => {
		evt.preventDefault();

		const formData = new FormData(form);

		const handleLoad = () => {
			const successElement = successTemplate.cloneNode(true);
	
			main.appendChild(successElement);

			const hideError = () => {
				removeHandlersOnTemplate();
				main.removeChild(successElement);
			}

			const handleClickHideTemplate = () => {
				hideError();
			}
	
			const handleKeyDownHideTemplate = (downEvt) => {
				window.utils.isEscapeEvent(downEvt, () => {
					hideError();
				});
			}
	
			const setHandlersOnTemplate = () => {
				successElement.addEventListener("click", handleClickHideTemplate);
				document.addEventListener("keydown", handleKeyDownHideTemplate);
			}
	
			const removeHandlersOnTemplate = () => {
				successElement.removeEventListener("click", handleClickHideTemplate);
				document.removeEventListener("keydown", handleKeyDownHideTemplate);
			}

			closeEditForm();
			setHandlersOnTemplate();
		}
	
		const handleError = (errorMessage) => {
			const errorElement = errorTemplate.cloneNode(true);
			errorElement.querySelector(".error__title").textContent = errorMessage;
			const repeatButton = errorElement.querySelector(".error__button:first-child");
	
			main.appendChild(errorElement);
	
			const hideError = () => {
				removeHandlersOnTemplate();
				main.removeChild(errorElement);
			}
	
			const handleClickHideTemplate = () => {
				window.utils.showElement(form);
				hideError();
				closeEditForm();
			}
	
			const handleKeyDownHideTemplate = (downEvt) => {
				window.utils.isEscapeEvent(downEvt, () => {
					window.utils.showElement(form);
					hideError();
					closeEditForm();
				});
			}

			const handleClickRepeat = () => {
				window.utils.showElement(form);
				hideError();
			}
	
			const setHandlersOnTemplate = () => {
				errorElement.addEventListener("click", handleClickHideTemplate);
				document.addEventListener("keydown", handleKeyDownHideTemplate);
				repeatButton.addEventListener("click", handleClickRepeat);
			}
	
			const removeHandlersOnTemplate = () => {
				errorElement.removeEventListener("click", handleClickHideTemplate);
				document.removeEventListener("keydown", handleKeyDownHideTemplate);
				repeatButton.removeEventListener("click", handleClickRepeat);
			}	
			
			window.utils.hideElement(form);
			setHandlersOnTemplate();
		}	

		window.backend.sendData(formData, handleLoad, handleError);
	}

	const getFormValidationErrors = (evt) => { // Валидация
		const errors = {
			noHash: false,
			oneSymbol: false,
			separator: false,
			longHashTag: false,
			repeatHashtag: false,
			overageHashTags: false
		};

		const errorToMessage = {
			noHash: "Хэш-тег должен начинаться символа # (решётка)",
			oneSymbol: "Хэш-тег не может состоять только из одной решётки (#)",
			separator: "Хэш-теги должны разделяться пробелами",
			longHashtag: `Максимальная длина одного хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая решётку`,
			repeatHashtag: "Хэш-теги не могут повторяться",
			overageHashtags: `Нельзя указать больше ${MAX_HASHTAGS_NUMBER} хэш-тегов`
		};

		let message = "";

		const getHashtagsArray = (evt) => {
			const hashtags = evt.target.value.toLowerCase().split(" ").filter(element => !!element);
			return hashtags;
		}

		const hashtags = getHashtagsArray(evt);
		
		hashtags.forEach((hashtag) => {
			errors.noHash = errors.noHash || (hashtag[0] !== "#");
			errors.oneSymbol = errors.oneSymbol || (hashtag === "#");
			errors.separator = errors.separator || (hashtag.includes("#", 1));
			errors.longHashtag = errors.longHashtag || (hashtag.length > MAX_HASHTAG_LENGTH);
		});

		errors.overageHashtags = errors.overageHashtags || (hashtags.length > MAX_HASHTAGS_NUMBER);

		const getHashtagRepeatError = (hashtags) => {
			const hashtagsArray = hashtags.filter((element, index) => {
				return (index !== hashtags.indexOf(element)) || (index !== hashtags.lastIndexOf(element));
			});

			return hashtagsArray;
		}

		errors.repeatHashtag = errors.repeatHashtag || (getHashtagRepeatError(hashtags).length > 0);

		for (const element in errors) {
			if (errors[element]) {
				message += `${errorToMessage[element]} ${SEPARATOR} `;
			}
		}

		return message;
	}

	const handleImageEditorCloseClick = () => {
		closeEditForm();
	}
	
	const handleImageEditorCloseKeyDown = (downEvt) => {
		window.utils.isEscapeEvent(downEvt, (evt) => {
			if (descriptionInput !== document.activeElement && hashtagsInput !== document.activeElement) {
				evt.preventDefault();
				closeEditForm();
			}
		});
	}
})()