const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;
const MIN_NUMBER_COMMENTS = 0;
const MAX_NUMBER_COMMENTS = 20;
const MIN_INDEX_AVATAR = 0;
const MIN_INDEX_MESSAGE = 0;
const MIN_INDEX_NAME = 0;
const MIN_INDEX_DESCRIPTION = 0;
const MAX_SHOWN_COMMENTS_COUNT = 5;
const MAX_SHOWN_MINIATURS_COUNT = 25

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

const picturesData = [];

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

const generatePicturesData = () => {
  const generateCommentsData = () => {
    const commentsData = [];

    const getRandomAvatar = () => {
      return getRandomElementFromArray(AVATARS, MIN_INDEX_AVATAR);
    }
  
    const getRandomMessage = () => {
      return getRandomElementFromArray(MESSAGES, MIN_INDEX_MESSAGE);
    }
      
    const getRandomName = () => {
      return getRandomElementFromArray(USER_NAMES, MIN_INDEX_NAME);
    }
  
    const randomQuantityComments = getRandomIntegerFromRange(MIN_NUMBER_COMMENTS, MAX_NUMBER_COMMENTS);

    for (let index = 0; index < randomQuantityComments; index++) {
      commentsData.push({
      	avatar: getRandomAvatar(),
      	message: getRandomMessage(),
        name: getRandomName()
      })
    }
    return commentsData;
  }

  const getRandomDescription = () => {
    return getRandomElementFromArray(DESCRIPTIONS, MIN_INDEX_DESCRIPTION);
  }
    
  const getRandomLikes = () => {
    return getRandomIntegerFromRange(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES);
  }

  for (let index = 0; index < MAX_SHOWN_MINIATURS_COUNT; index++) {
    picturesData.push({
      comments: generateCommentsData(),
      likes: getRandomLikes(),
      image: PHOTOS_URLS[index],
      description: getRandomDescription()
    })
  }
}

const renderAllPictures = () => {
  const createPicture = (picture, index) => {
    const pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
  
    const image = pictureTemplate.cloneNode(true);
  
    image.querySelector(".picture__comments").textContent = picture.comments.length;
    image.querySelector(".picture__likes").textContent = picture.likes;
    image.querySelector(".picture__img").src = picture.image;
    image.setAttribute("data-number", index);
  
    return image;
  }

  const picturesContainer = document.querySelector(".pictures");
  const picturesFragment = document.createDocumentFragment();

  picturesData.forEach((picture, index) => {
    picturesFragment.append(createPicture(picture, index));
  });

  picturesContainer.append(picturesFragment);

  const setPicturesClickListeners = () => {
    const miniaturs = picturesContainer.querySelectorAll(".picture__img");
  
    miniaturs.forEach((evt) => evt.addEventListener("click", handlePictureClick));
  }

  setPicturesClickListeners();
}

const renderBigPicture = (pictureID) => {
  const bigPicture = document.querySelector(".big-picture");

  bigPicture.querySelector(".big-picture__img img").src = picturesData[pictureID].image;
  bigPicture.querySelector(".comments-count").textContent = picturesData[pictureID].comments.length;
  bigPicture.querySelector(".social__caption").textContent = picturesData[pictureID].description;
  bigPicture.querySelector(".likes-count").textContent = picturesData[pictureID].likes;

  const renderCommentsForBigPicture = (pictureID) => {
    const commentsList = bigPicture.querySelector(".social__comments");
    clearContentsOfElement(commentsList);
    
    const createComments = (pictureID) => {
			const fragment = new DocumentFragment();
			
			const createElementForComment = (index) => {
				const newComment = document.createElement('li');
      	const avatarComment = document.createElement("img");
      	const messageComment = document.createElement("p");

				const appendElement = () => {
					newComment.append(avatarComment);
					newComment.append(messageComment);
				}
			
				const addClassForElement = () => {
					newComment.classList.add("social__comment");
      		avatarComment.classList.add("social__picture");
					messageComment.classList.add("social__text");
        } 
        
        const assignElementData = () => {
          avatarComment.src = picturesData[pictureID].comments[index].avatar; 
          messageComment.textContent = picturesData[pictureID].comments[index].message;  
        }

        appendElement();
        addClassForElement();
        assignElementData();

        return newComment;
			}
            
    	for (let index = 0; index < Math.min(picturesData[pictureID].comments.length, MAX_SHOWN_COMMENTS_COUNT); index++) {
      	fragment.append(createElementForComment(index));
			}
			 
      return fragment;
		}
		    
    commentsList.append(createComments(pictureID));
	}
	
	renderCommentsForBigPicture(pictureID);
	
	showElement(bigPicture);

  const removePicturesClickListeners = () => {
    const miniaturs = document.querySelectorAll(".picture__img");
  
    miniaturs.forEach((evt) => evt.removeEventListener("click", handlePictureClick));
  }

  removePicturesClickListeners();
}

const handlePictureClick = (evt) => {
	document.querySelector(".social__comment-count").classList.add("visually-hidden");
  document.querySelector(".comments-loader").classList.add("visually-hidden");
  const pictureID = evt.currentTarget.parentNode.getAttribute("data-number");

  renderBigPicture(pictureID);
}

generatePicturesData();
renderAllPictures();