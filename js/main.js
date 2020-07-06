"use strict";

// Глобальные константы //

const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;
const MIN_NUMBER_COMMENTS = 0;
const MAX_NUMBER_COMMENTS = 20;
const MIN_INDEX_AVATAR = 0;
const MIN_INDEX_MESSAGE = 0;
const MIN_INDEX_NAME = 0;
const MIN_INDEX_DESCRIPTION = 0;
const MAX_SHOWN_COMMENTS_COUNT = 5;
const MAX_SHOWN_MINIATURS_COUNT = 25;
const MIN_SLIDER_VALUE = 0;
const MAX_SLIDER_VALUE = 100;
const ENTER = "Enter";
const ESCAPE = "Escape";
const MAX_HASHTAGS_NUMBER = 5;
const MAX_HASHTAG_LENGTH = 20;
const SEPARATOR = "||";

// Данные //

const MESSAGES = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];

const USER_NAMES = [
  "Максим",
  "Диана",
  "Виолетта",
  "Захарушка",
  "Анна",
  "Пётр",
  "Наталия"
];

const PHOTOS_URLS = [
  "photos/1.jpg",
  "photos/2.jpg",
  "photos/3.jpg",
  "photos/4.jpg",
  "photos/5.jpg",
  "photos/6.jpg",
  "photos/7.jpg",
  "photos/8.jpg",
  "photos/9.jpg",
  "photos/10.jpg",
  "photos/11.jpg",
  "photos/12.jpg",
  "photos/13.jpg",
  "photos/14.jpg",
  "photos/15.jpg",
  "photos/16.jpg",
  "photos/17.jpg",
  "photos/18.jpg",
  "photos/19.jpg",
  "photos/20.jpg",
  "photos/21.jpg",
  "photos/22.jpg",
  "photos/23.jpg",
  "photos/24.jpg",
  "photos/25.jpg"
];

const DESCRIPTIONS = [
  "Если смогу, я сделаю это. Конец истории.",
  "Я не ленивый. Просто у меня нет мотивации.",
  "Я — это мы.",
  "Просто ешьте, живите и любите. Затем с утра повторяйте каждый день.",
  "Любите меня, от этого я буду сиять еще ярче.",
  "Утром, только одна хорошая мысль меняет смысл целого дня.",
  "Никогда не позволяйте никому скучать.",
  "Я пыталась заниматься йогой, но в позе лотоса уснула.",
  "Всегда начинайте свой день с хороших людей и кофе.",
  "Да, я сумасшедшая. Быть нормальной — слишком скучно."
];

const AVATARS = [
  "img/avatar-1.svg",
  "img/avatar-2.svg",
  "img/avatar-3.svg",
  "img/avatar-4.svg",
  "img/avatar-5.svg",
  "img/avatar-6.svg",
];

const Effect = {
  NONE: {
    className: "effects__preview--none",
    cssProperty: "none",
    maxValue: null,
    minValue: null,
    unit: ""
  },
  CHROME: {
    className: "effects__preview--chrome",
    cssProperty: "grayscale",
    maxValue: 1,
    minValue: 0,
    unit: ""
  },
  SEPIA: {
    className: "effects__preview--sepia",
    cssProperty: "sepia",
    maxValue: 1,
    minValue: 0,
    unit: ""
  },
  MARVIN: {
    className: "effects__preview--marvin",
    cssProperty: "invert",
    maxValue: 100,
    minValue: 0,
    unit: "%"
  },
  PHOBOS: {
    className: "effects__preview--phobos",
    cssProperty: "blur",
    maxValue: 3,
    minValue: 0,
    unit: "px"
  },
  HEAT: {
    className: "effects__preview--heat",
    cssProperty: "brightness",
    maxValue: 3,
    minValue: 1,
    unit: ""
  }
}

const picturesData = [];

// Общие функции //

const clearContentsOfElement = (element) => {
  element.innerHTML = "";
}

const showElement = (element) => {
  element.classList.remove("hidden");
}

const hideElement = (element) => {
  element.classList.add("hidden");
}

const getRandomIntegerFromRange = (minValue, maxValue) => {
  return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
}

const isEnterEvent = (evt, callback) => {
  if (evt.code === ENTER) {
    callback(evt);
  }
}

const isEscapeEvent = (evt, callback) => {
  if (evt.code === ESCAPE) {
    callback(evt);
  }
}

// Функции работы с миниатюрами //

const generatePicturesData = () => {
  const generateCommentsData = () => {
    const commentsData = [];

    const randomQuantityComments = getRandomIntegerFromRange(MIN_NUMBER_COMMENTS, MAX_NUMBER_COMMENTS);

    for (let index = 0; index < randomQuantityComments; index++) {
      commentsData.push({
      	avatar: AVATARS[getRandomIntegerFromRange(MIN_INDEX_AVATAR, AVATARS.length - 1)],
      	message: MESSAGES[getRandomIntegerFromRange(MIN_INDEX_MESSAGE, MESSAGES.length - 1)],
        name: USER_NAMES[getRandomIntegerFromRange(MIN_INDEX_NAME, USER_NAMES.length - 1)]
      });
    }

    return commentsData;
  }

  for (let index = 0; index < MAX_SHOWN_MINIATURS_COUNT; index++) {
    picturesData.push({
      comments: generateCommentsData(),
      likes: getRandomIntegerFromRange(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES),
      image: PHOTOS_URLS[index],
      description: DESCRIPTIONS[getRandomIntegerFromRange(MIN_INDEX_DESCRIPTION, DESCRIPTIONS.length - 1)]
    });
  }
}

const renderAllPictures = () => {
  const picturesContainer = document.querySelector(".pictures");
  const fragment = document.createDocumentFragment();
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

// Функциии работы с большими изображениями //

const renderBigPicture = (pictureID) => {
  const bigPicture = document.querySelector(".big-picture");

  const assignDataForBigPicture = () => {  
    bigPicture.querySelector(".big-picture__img img").src = picturesData[pictureID].image;
    bigPicture.querySelector(".comments-count").textContent = picturesData[pictureID].comments.length;
    bigPicture.querySelector(".social__caption").textContent = picturesData[pictureID].description;
    bigPicture.querySelector(".likes-count").textContent = picturesData[pictureID].likes;
  }

  const renderCommentsForBigPicture = (pictureID) => {
    const commentsList = bigPicture.querySelector(".social__comments");

    clearContentsOfElement(commentsList); // Удаление первого комментария из вёрстки
    
    const createComments = (pictureID) => {
			const fragment = new DocumentFragment();
    
      const createCommentWrapper = (index) => {
        const createComment = () => {
          const newComment = document.createElement('li');
          newComment.classList.add("social__comment");
  
          return newComment;
        }
        
        const createAvatar = () => {
          const avatar = document.createElement("img");
          avatar.classList.add("social__picture");

          avatar.src = picturesData[pictureID].comments[index].avatar; 
          
          return avatar;
        }

        const createMessage = () => {
          const message = document.createElement("p");
          message.classList.add("social__text");

          message.textContent = picturesData[pictureID].comments[index].message; 

          return message;
        }

        const comment = createComment();
        comment.append(createAvatar(),createMessage());
        return comment;
      }
            
      const maxShowCommentCount = Math.min(picturesData[pictureID].comments.length, MAX_SHOWN_COMMENTS_COUNT);

    	for (let index = 0; index < maxShowCommentCount; index++) {
      	fragment.append(createCommentWrapper(index));
			}
			 
      return fragment;
		}
		    
    commentsList.append(createComments(pictureID));
  }
  
  const hideCommentsCounter = () => {
    document.querySelector(".social__comment-count").classList.add("visually-hidden");
    document.querySelector(".comments-loader").classList.add("visually-hidden");
  }
	
	renderCommentsForBigPicture(pictureID);
	assignDataForBigPicture();
  showElement(bigPicture);
  hideCommentsCounter();
}

// Функции для работы с редактором //

const initFileUpload = () => {
  const form = document.querySelector(".img-upload__form");
  const uploadInput = form.querySelector(".img-upload__input");
  const overlay = form.querySelector(".img-upload__overlay");
  const uploadedImage = overlay.querySelector(".img-upload__preview img");
  const editorCloseButton = overlay.querySelector(".img-upload__cancel");
  const effectsRadio = overlay.querySelectorAll(".effects__radio");
  const slider = overlay.querySelector(".img-upload__effect-level");
  const effectLine = slider.querySelector(".effect-level__line");
  const pin = effectLine.querySelector(".effect-level__pin");
  const depth = effectLine.querySelector(".effect-level__depth");
  const effectValue = slider.querySelector(".effect-level__value");
  const hashtagsInput = overlay.querySelector(".text__hashtags");
  const descriptionInput = overlay.querySelector(".text__description");
  let currentElement;
  const handleFileUploadChange = () => {
    showElement(overlay);
    hideElement(slider); 
    setEditFormListeners();
  }

  const deleteOldEffectDataFromImage = () => {
    uploadedImage.style.filter = "";
    uploadedImage.className = "";
  }

  uploadInput.addEventListener("change", handleFileUploadChange);

  const addEffectDataToImage = (currentElement) => {
    const getSaturation = (effect) => {
      const value = effectValue.getAttribute("value");
      const percent = (effect.maxValue - effect.minValue) / MAX_SLIDER_VALUE;
      return (percent * value) + effect.minValue;
    }

    const effect = Effect[currentElement.value.toUpperCase()];
    uploadedImage.style.filter = `${effect.cssProperty}(${getSaturation(effect)}${effect.unit})`;
    uploadedImage.classList.add(effect.className);
  }

  const setSliderValue = (value) => {
    pin.style.left = `${value}%`;
    depth.style.width = `${value}%`;
    effectValue.setAttribute("value", value);
  }

  const applyEffect = (currentElement) => {
    if (currentElement.value === "none") {
      hideElement(slider);
    } else {
      showElement(slider);
    } 

    deleteOldEffectDataFromImage();

    const effect = Effect[currentElement.value.toUpperCase()];
    uploadedImage.style.filter = `${effect.cssProperty}(${effect.maxValue}${effect.unit})`;
    uploadedImage.classList.add(effect.className);

    setSliderValue(MAX_SLIDER_VALUE);
  }

  const handleEffectFocus = (evt) => {
    currentElement = evt.target;
    applyEffect(currentElement);
  }

  const handlePinMouseDown = (evt) => {
    evt.preventDefault();

    let startCoord = evt.pageX;

    const handlePinMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      
      setEffectValue(moveEvt);
    }

    const handlePinMouseUp = (upEvt) => {
      setEffectValue(upEvt);

      document.removeEventListener("mousemove", handlePinMouseMove);
      document.removeEventListener("mouseup", handlePinMouseUp);
    }

    const setEffectValue = (moveEvt) => {
      const shiftX = startCoord - moveEvt.pageX; 
  
      startCoord = moveEvt.pageX;
  
      let pinPosition = ((pin.offsetLeft - shiftX) / effectLine.clientWidth) * MAX_SLIDER_VALUE;
  
      if (pinPosition > MAX_SLIDER_VALUE) {
        pinPosition = MAX_SLIDER_VALUE;
      }
      if (pinPosition < MIN_SLIDER_VALUE) {
        pinPosition = MIN_SLIDER_VALUE;
      }
  
      setSliderValue(pinPosition);
      addEffectDataToImage(currentElement);
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
  }

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
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

  const removeEditFormListeners = () => {
    editorCloseButton.removeEventListener("click", handleImageEditorCloseClick);
    document.removeEventListener("keydown", handleImageEditorCloseKeyDown);
    hashtagsInput.removeEventListener("input", handleHashtagInput);
    form.removeEventListener("submit", handleFormSubmit);
    pin.removeEventListener("mousedown", handlePinMouseDown);

    effectsRadio.forEach((effect) => {
      effect.removeEventListener("focus", handleEffectFocus);
    });
  }

  const clearInput = () => {
    uploadInput.value = "";
    descriptionInput.value = "";
    hashtagsInput.value = "";
  }

  const closeEditForm = () => {
    clearInput();
    hideElement(overlay);
    removeEditFormListeners();
    deleteOldEffectDataFromImage();
  }

  const handleImageEditorCloseClick = () => {
    closeEditForm();
  }
  
  const handleImageEditorCloseKeyDown = (downEvt) => {
    isEscapeEvent(downEvt, (evt) => {
      if (descriptionInput !== document.activeElement && hashtagsInput !== document.activeElement) {
        evt.preventDefault();
        closeEditForm();
      }
    });
  }
}

// Вызов основных функций //

generatePicturesData();
renderAllPictures();
initFileUpload();