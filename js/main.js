const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;
const MIN_NUMBER_COMMENT = 0;
const MAX_NUMBER_COMMENTS = 20;
const MIN_NUMBER_AVATAR = 0;
const MIN_NUMBER_MESSAGE = 0;
const MIN_NUMBER_NAME = 0;
const MIN_NUMBER_DESCRIPTION = 0;
const MAX_SHOWN_COMMENTS_COUNT = 5;

const MESSAGE_DATA = [
    "Всё отлично!",
    "В целом всё неплохо. Но не всё.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
    "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];

const USERS_NAME = [
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

const DESCRIPTION_DATA = [
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

const AVATARS_DATA = [
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

const getRandomInteger = (minValue, maxValue) => {
    return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
}

const generatePicturesData = () => {
    const generateCommentsData = () => {
        const commentsData = [];
    
        const getRandomAvatar = () => {
            return AVATARS_DATA[getRandomInteger(MIN_NUMBER_AVATAR, AVATARS_DATA.length - 1)];
        }
        
        const getRandomMessage = () => {
            return MESSAGE_DATA[getRandomInteger(MIN_NUMBER_MESSAGE, MESSAGE_DATA.length - 1)];
        }
        
        const getRandomName = () => {
            return USERS_NAME[getRandomInteger(MIN_NUMBER_NAME, USERS_NAME.length - 1)];
        }
    
        for (let index = 0; index < getRandomInteger(MIN_NUMBER_COMMENT, MAX_NUMBER_COMMENTS); index++) {
            commentsData.push({
                avatar: getRandomAvatar(),
                message: getRandomMessage(),
                name: getRandomName()
            })
        }
    
        return commentsData;
    }

    const getRandomDescription = () => {
        return DESCRIPTION_DATA[getRandomInteger(MIN_NUMBER_DESCRIPTION, DESCRIPTION_DATA.length - 1)];
    }
    
    const getRandomLikes = () => {
        return getRandomInteger(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES);
    }

    for (let index = 0; index < PHOTOS_URLS.length; index++) {
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

    showElement(bigPicture);

    bigPicture.querySelector(".big-picture__img img").src = picturesData[pictureID].image;
    bigPicture.querySelector(".comments-count").textContent = picturesData[pictureID].comments.length;
    bigPicture.querySelector(".social__caption").textContent = picturesData[pictureID].description;
    bigPicture.querySelector(".likes-count").textContent = picturesData[pictureID].likes;

    const renderCommentsForBigPicture = (pictureID) => {
        const commentsList = bigPicture.querySelector(".social__comments");
        clearContentsOfElement(commentsList);
    
        const createComments = (pictureID) => {
            const fragment = new DocumentFragment();
            
            for (let index = 0; index < Math.min(picturesData[pictureID].comments.length, MAX_SHOWN_COMMENTS_COUNT); index++) {
                const li = document.createElement('li');
                const img = document.createElement("img");
                const paragraph = document.createElement("p");
        
                li.append(img);
                li.append(paragraph);
        
                li.classList.add("social__comment");
                img.classList.add("social__picture");
                paragraph.classList.add("social__text");

                img.src = picturesData[pictureID].comments[index].avatar; 
                paragraph.textContent = picturesData[pictureID].comments[index].message; 
        
                fragment.append(li);
            }
        
            return fragment;
        }
        
        commentsList.append(createComments(pictureID));
    }

    renderCommentsForBigPicture(pictureID);

    const removePicturesClickListeners = () => {
        const miniaturs = document.querySelectorAll(".picture__img");
    
        miniaturs.forEach((evt) => evt.removeEventListener("click", handlePictureClick));
    }

    removePicturesClickListeners();
}

const handlePictureClick = (evt) => {
    const pictureID = evt.currentTarget.parentNode.getAttribute("data-number");
    const commentCount = document.querySelector(".social__comment-count").classList.add("visually-hidden");
    const commentsLoader = document.querySelector(".comments-loader").classList.add("visually-hidden");

    renderBigPicture(pictureID);
}

generatePicturesData();
renderAllPictures();