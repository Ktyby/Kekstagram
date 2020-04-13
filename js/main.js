const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;
const MIN_NUMBER_COMMENT = 0;
const MIN_NUMBER_NAME = 0;

const picturesData = [];

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
//const picturesContainer = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();

const commentsData = [
    "Всё отлично!",
    "В целом всё неплохо. Но не всё.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
    "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];

const usersName = [
    "Максим",
    "Диана",
    "Виолетта",
    "Захар",
    "Анна",
    "Пётр",
    "Наталия"
];

const photosUrls = [
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

const getRandomInteger = (minValue, maxValue) => {
    return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
}

const generatePicturesData = () => {
    for (let index = 0; index < photosUrls.length; index++) {
        picturesData.push({
            comments: commentsData[getRandomInteger(MIN_NUMBER_COMMENT, commentsData.length - 1)],
            likes: getRandomInteger(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES),
            name: usersName[getRandomInteger(MIN_NUMBER_NAME, usersName.length - 1)],
            avatar: photosUrls[index]
        })
    }
}

picturesData.forEach((picture) => {
    picturesFragment.appendChild(createPicture(picture, index));
});

const createPicture = (picture) => {
    const image = pictureTemplate.cloneNode(true);

    image.querySelector('.picture__comments').textContent = picture.comments;
    image.querySelector('.picture__likes').textContent = picture.likes;
    image.querySelector('.picture__img').src = picture.avatar;

    return image;
}

console.log(picturesData);
generatePicturesData();
createPicture();