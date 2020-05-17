const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;
const MIN_NUMBER_COMMENT = 5;
const MAX_NUMBER_COMMENTS = 20;
const MIN_NUMBER_AVATAR = 0;
const MIN_NUMBER_MESSAGE = 0;
const MIN_NUMBER_NAME = 0;
const MIN_NUMBER_DESCRIPTION = 0;

const pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
const bigPicture = document.querySelector(".big-picture");

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

const PICTURES_DATA = [];

const getRandomInteger = (minValue, maxValue) => {
    return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
}

const generateCommentsData = () => {
    const COMMENTS_DATA = [];

    for (let index = 0; index < getRandomInteger(MIN_NUMBER_COMMENT, MAX_NUMBER_COMMENTS); index++) {
        COMMENTS_DATA.push({
            avatar: AVATARS_DATA[getRandomInteger(MIN_NUMBER_AVATAR, AVATARS_DATA.length - 1)],
            message: MESSAGE_DATA[getRandomInteger(MIN_NUMBER_MESSAGE, MESSAGE_DATA.length - 1)],
            name: USERS_NAME[getRandomInteger(MIN_NUMBER_NAME, USERS_NAME.length - 1)]
        })
    }

    return COMMENTS_DATA;
}

const generatePicturesData = () => {
    for (let index = 0; index < PHOTOS_URLS.length; index++) {
        PICTURES_DATA.push({
            comments: generateCommentsData(),
            likes: getRandomInteger(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES),
            image: PHOTOS_URLS[index],
            description: DESCRIPTION_DATA[getRandomInteger(MIN_NUMBER_DESCRIPTION, DESCRIPTION_DATA.length - 1)]
        })
    }
}

const createPicture = (picture, index) => {
    const image = pictureTemplate.cloneNode(true);

    image.querySelector(".picture__comments").textContent = picture.comments.length;
    image.querySelector(".picture__likes").textContent = picture.likes;
    image.querySelector(".picture__img").src = picture.image;
    image.setAttribute("data-number", index);

    return image;
}

const renderAllPictures = () => {
    const picturesContainer = document.querySelector(".pictures");
    const picturesFragment = document.createDocumentFragment();

    PICTURES_DATA.forEach((picture, index) => {
        picturesFragment.append(createPicture(picture, index));
    });

    picturesContainer.append(picturesFragment);
}

const renderBigPicture = () => {
    bigPicture.classList.remove("hidden");

    bigPicture.querySelector(".big-picture__img").src = PICTURES_DATA[pictureID].avatar;
    bigPicture.querySelector(".likes-count").textContent = PICTURES_DATA[pictureID].likes;
    bigPicture.querySelector(".comments-count").textContent = PICTURES_DATA[pictureID].comments.length;
    bigPicture.querySelector(".social__text").textContent = PICTURES_DATA[pictureID].comments;
    bigPicture.querySelector(".social__caption").textContent = PICTURES_DATA[pictureID].description;
}

const handlePictureClick = (evt) => {
    renderBigPicture();

    const pictureID = evt.currentTarget.getAttribute("data-number");
    console.log(pictureID);
}

const setPicturesClickListeners = () => {
    const miniaturs = document.querySelectorAll(".picture__img");

    miniaturs.forEach((evt) => evt.addEventListener("click", handlePictureClick(evt)));
}

console.log(PICTURES_DATA);

generateCommentsData();
generatePicturesData();
renderAllPictures();