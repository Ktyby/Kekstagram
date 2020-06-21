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
const MAX_SLIDER_VALUE = "100";
const ENTER = "Enter";
const ESCAPE = "Escape";

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

const Effects = {
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
    maxValue: "3",
    minValue: "0",
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

const getRandomElementFromArray = (array, minValue = 0, maxValue = array.length - 1) => {
	return array[getRandomIntegerFromRange(minValue, maxValue)];
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
      	avatar: getRandomElementFromArray(AVATARS, MIN_INDEX_AVATAR),
      	message: getRandomElementFromArray(MESSAGES, MIN_INDEX_MESSAGE),
        name: getRandomElementFromArray(USER_NAMES, MIN_INDEX_NAME)
      });
    }

    return commentsData;
  }

  for (let index = 0; index < MAX_SHOWN_MINIATURS_COUNT; index++) {
    picturesData.push({
      comments: generateCommentsData(),
      likes: getRandomIntegerFromRange(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES),
      image: PHOTOS_URLS[index],
      description: getRandomElementFromArray(DESCRIPTIONS, MIN_INDEX_DESCRIPTION)
    });
  }
}

const renderAllPictures = () => {
  const picturesContainer = document.querySelector(".pictures");
  const picturesFragment = document.createDocumentFragment();
  const miniaturs = picturesContainer.querySelectorAll(".picture");

  const createPicture = (picture, index) => {
    const pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
  
    const image = pictureTemplate.cloneNode(true);
  
    image.querySelector(".picture__comments").textContent = picture.comments.length;
    image.querySelector(".picture__likes").textContent = picture.likes;
    image.querySelector(".picture__img").src = picture.image;
    image.setAttribute("data-number", index);
  
    return image;
  }

  picturesData.forEach((picture, index) => {
    picturesFragment.append(createPicture(picture, index));
  });

  picturesContainer.append(picturesFragment);

  const setPicturesListeners = () => {
    const miniaturs = picturesContainer.querySelectorAll(".picture");

    miniaturs.forEach((picture) => {
      picture.addEventListener("click", handlePictureClick);
      picture.addEventListener("keydown", handlePictureKeyDown);
    });
  }

  setPicturesListeners();
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

  const removePicturesListeners = () => {
    const miniaturs = document.querySelectorAll(".picture__img");
  
    miniaturs.forEach((picture) => {
      picture.removeEventListener("click", handlePictureClick);
      picture.removeEventListener("keydown", handlePictureKeyDown);
    });
  }
	
	renderCommentsForBigPicture(pictureID);
	assignDataForBigPicture();
  showElement(bigPicture);
  hideCommentsCounter();

  removePicturesListeners();
}

// Функции для работы с редактором //

const initFileUpload = () => {
  const overlay = document.querySelector(".img-upload__overlay");
  const uploadInput = document.querySelector(".img-upload__input");
  const uploadedImge = overlay.querySelector(".img-upload__preview img");
  const editorCloseButton = overlay.querySelector(".img-upload__cancel");
  const effectsRadio = overlay.querySelectorAll(".effects__radio");
  const slider = overlay.querySelector(".img-upload__effect-level");
  const pin = slider.querySelector(".effect-level__pin");
  const depth = slider.querySelector(".effect-level__depth");
  const effectValue = slider.querySelector(".effect-level__value");

  
  const handleFileUploadChange = () => {
    showElement(overlay);
    hideElement(slider); 
    deleteOldEffectDataFromImage();    
    setEditFormListeners();
  }

  uploadInput.addEventListener("change", handleFileUploadChange);

  const addEffectDataToImage = (currentElement) => {
    const effect = Effects[currentElement.value.toUpperCase()];
    uploadedImge.style.filter = `${effect.cssProperty}
                                (${effect.maxValue}
                                ${effect.unit})`;
    uploadedImge.classList.add(effect.className);
  }

  const deleteOldEffectDataFromImage = () => {
    uploadedImge.style.filter = "";
    uploadedImge.className = "";
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
    addEffectDataToImage(currentElement);
    setSliderValue(MAX_SLIDER_VALUE);
  }

  const handleEffectFocus = (evt) => {
    applyEffect(evt.target);
  }
  
  const setEditFormListeners = () => {
    editorCloseButton.addEventListener("click", handleImageEditorCloseClick);
    document.addEventListener("keydown", handleImageEditorCloseKeyDown);

    effectsRadio.forEach((effect) => {
      effect.addEventListener("focus", handleEffectFocus);
    });
  }

  const cleanUploadInput = () => {
    uploadInput.value = "";
  }

  const removeEditFormListeners = () => {
    editorCloseButton.removeEventListener("click", handleImageEditorCloseClick);
    document.removeEventListener("keydown", handleImageEditorCloseKeyDown);

    effectsRadio.forEach((effect) => {
      effect.removeEventListener("focus", handleEffectFocus);
    });
  }

  const handleImageEditorCloseClick = () => {
    cleanUploadInput();
    hideElement(overlay);
    removeEditFormListeners();
  }
  
  const handleImageEditorCloseKeyDown = (downEvt) => {
    isEscapeEvent(downEvt, (evt) => {
      evt.preventDefault();
      cleanUploadInput();
      hideElement(overlay);
      removeEditFormListeners();
    });
  }
}

// Вызов основных функций //

generatePicturesData();
renderAllPictures();
initFileUpload();