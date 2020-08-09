"use strict";

(() => {
	const MIN_SLIDER_VALUE = 0;
	const MAX_SLIDER_VALUE = 100;
	const MAX_HASHTAGS_NUMBER = 5;
	const MAX_HASHTAG_LENGTH = 20;
	const SEPARATOR = "||";
	const MIN_SCALE_VALUE = 25;
	const MAX_SCALE_VALUE = 100;
	const ZOOM_STEP = 25;
	const AVAILABLE_IMAGE_FORMATS = ["jpeg", "png", "gif", "jpg"];
	const WRONG_FILE_TYPE_MESSAGE = "Я могу просматривать только фото!";

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
	const uploadPreview = imageEditor.querySelector(".img-upload__preview");
	const uploadedImage = uploadPreview.querySelector("img");
	const editorCloseButton = imageEditor.querySelector(".img-upload__cancel");
	const effectsRadio = imageEditor.querySelectorAll(".effects__radio");
	const slider = imageEditor.querySelector(".img-upload__effect-level");
	const effectLine = slider.querySelector(".effect-level__line");
	const pin = effectLine.querySelector(".effect-level__pin");
	const depth = effectLine.querySelector(".effect-level__depth");
	const effectValue = slider.querySelector(".effect-level__value");
	const hashtagsInput = imageEditor.querySelector(".text__hashtags");
	const descriptionInput = imageEditor.querySelector(".text__description");
	const scaleInput = imageEditor.querySelector(".scale__control--value");
	const scaleButtonSmaller = imageEditor.querySelector(".scale__control--smaller");
	const scaleButtonBigger = imageEditor.querySelector(".scale__control--bigger");

	let currentEffect = Effect.NONE;
	let scale = MAX_SCALE_VALUE;

	const showImageEditor = (pathToImage) => {
		uploadedImage.src = pathToImage;

		window.utils.showElement(imageEditor);
		window.utils.hideElement(slider); 
		
		setEditFormListeners();
	}

	const handleFileUploadChange = () => {
		const [file] = uploadInput.files;
		const fileName = file.name.toLowerCase();

		const isMatches = AVAILABLE_IMAGE_FORMATS.some((format) => fileName.endsWith(format))		

		if (isMatches) {
			const reader = new FileReader();

			reader.readAsDataURL(file);

			reader.addEventListener("load", () => {
				changePictureScale(MAX_SCALE_VALUE);
				showImageEditor(reader.result);
			});
		} else {
			handleError(WRONG_FILE_TYPE_MESSAGE);
		}
	}

	uploadInput.addEventListener("change", handleFileUploadChange);

	const changePictureScale = (newScale) => {
		scale = newScale;
		scaleInput.setAttribute("value", `${scale}%`);
		uploadPreview.style.transform = `scale(${scale / MAX_SCALE_VALUE})`;
	}

	const handleScaleButtonSmallerClick = () => {
		if (scale > MIN_SCALE_VALUE) {
			scale -= ZOOM_STEP;
			changePictureScale(scale);
		}
	}

	const handleScaleButtonBiggerClick = () => {
		if (scale < MAX_SCALE_VALUE) {
			scale += ZOOM_STEP;
			changePictureScale(scale);
		}
	}

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

	const deleteOldEffectDataFromImage = () => {
		pin.style = "";
		depth.style = "";
		uploadedImage.style.filter = "";
		effectValue.removeAttribute("value");
		uploadedImage.classList.remove(`effects__preview--${currentEffect.effectName}`);
	}
	
	const setEditFormListeners = () => {
		editorCloseButton.addEventListener("click", handleImageEditorCloseClick);
		document.addEventListener("keydown", handleImageEditorCloseKeyDown);
		hashtagsInput.addEventListener("input", handleHashtagInput);
		form.addEventListener("submit", handleFormSubmit);
		pin.addEventListener("mousedown", handlePinMouseDown);
		scaleButtonSmaller.addEventListener("click", handleScaleButtonSmallerClick);
		scaleButtonBigger.addEventListener("click", handleScaleButtonBiggerClick);

		effectsRadio.forEach((effect) => {
			effect.addEventListener("focus", handleEffectFocus);
		});
	}

	const removeEditFormListeners = () => {
		editorCloseButton.removeEventListener("click", handleImageEditorCloseClick);
		document.removeEventListener("keydown", handleImageEditorCloseKeyDown);
		hashtagsInput.removeEventListener("input", handleHashtagInput);
		form.removeEventListener("submit", handleFormSubmit);
		pin.removeEventListener("mousedown", handlePinMouseDown);
		scaleButtonSmaller.removeEventListener("click", handleScaleButtonSmallerClick);
		scaleButtonBigger.removeEventListener("click", handleScaleButtonBiggerClick);
		deleteOldEffectDataFromImage();

		effectsRadio.forEach((effect) => {
			effect.removeEventListener("focus", handleEffectFocus);
		});
	}

	const handleError = (errorMessage) => {
		const errorElement = errorTemplate.cloneNode(true);

		errorElement.querySelector(".error__title").textContent = errorMessage;

		const errorButton = errorElement.querySelector(".error__button:first-child");

		main.appendChild(errorElement);

		if (errorMessage === WRONG_FILE_TYPE_MESSAGE) {
			window.utils.hideElement(errorButton);	
		}

		const hideError = () => {
			removeErrorModalListeners();
			errorElement.remove();
		}

		const closeErrorAndShowForm = () => {
			window.utils.showElement(form);
			hideError();
			closeEditForm();
		}

		const handleHideErrorClick = () => {
			closeErrorAndShowForm();
		}

		const handleHideErrorKeyDown = (downEvt) => {
			window.utils.isEscapeEvent(downEvt, closeErrorAndShowForm);
		}

		const handleReturnToEditorImageClick = () => {
			window.utils.showElement(form);
			hideError();
		}

		const setErrorModalListeners = () => {
			errorElement.addEventListener("click", handleHideErrorClick);
			document.addEventListener("keydown", handleHideErrorKeyDown);
			errorButton.addEventListener("click", handleReturnToEditorImageClick);
		}

		const removeErrorModalListeners = () => {
			errorElement.removeEventListener("click", handleHideErrorClick);
			document.removeEventListener("keydown", handleHideErrorKeyDown);
			errorButton.removeEventListener("click", handleReturnToEditorImageClick);
		}	
		
		window.utils.hideElement(form);
		setErrorModalListeners();
	}

	const handleFormSubmit = (evt) => { // Отправка данных на сервер
		evt.preventDefault();

		const formData = new FormData(form);

		const handleLoad = () => {
			const successElement = successTemplate.cloneNode(true);
	
			main.appendChild(successElement);

			const hideError = () => {
				removeSuccessMessageListeners();
				successElement.remove();
			}

			const handleHideSuccessMessageClick = () => {
				hideError();
			}
	
			const handleHideSuccessMessageKeyDown = (downEvt) => {
				window.utils.isEscapeEvent(downEvt, hideError);
			}
	
			const setSuccessMessageListeners = () => {
				successElement.addEventListener("click", handleHideSuccessMessageClick);
				document.addEventListener("keydown", handleHideSuccessMessageKeyDown);
			}
	
			const removeSuccessMessageListeners = () => {
				successElement.removeEventListener("click", handleHideSuccessMessageClick);
				document.removeEventListener("keydown", handleHideSuccessMessageKeyDown);
			}

			closeEditForm();
			setSuccessMessageListeners();
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
			message += errors[element] ? `${errorToMessage[element]} ${SEPARATOR} ` : '';
		}

		return message;
	}

	const handleHashtagInput = (evt) => {    
		hashtagsInput.setCustomValidity("");
		hashtagsInput.setCustomValidity(getFormValidationErrors(evt));
		hashtagsInput.style.borderColor = getFormValidationErrors(evt) ? "red" : "";
	}

	const clearForm = () => {
		hashtagsInput.setCustomValidity("");
    hashtagsInput.value = "";
    hashtagsInput.style.borderColor = "";
    descriptionInput.value = "";
	}

	const closeEditForm = () => {
		uploadInput.value = "";

		clearForm();
		window.utils.hideElement(imageEditor);
		removeEditFormListeners();
	}

	const handleImageEditorCloseClick = () => {
		closeEditForm();
	}
	
	const handleImageEditorCloseKeyDown = (downEvt) => {
		if (descriptionInput !== document.activeElement && hashtagsInput !== document.activeElement) {
			window.utils.isEscapeEvent(downEvt, closeEditForm);
		}
	}
})()