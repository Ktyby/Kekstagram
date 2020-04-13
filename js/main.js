const usersData = [];

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
//const picturesContainer = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();
const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;

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

const getRandomComment = (commentsData) => {
    const RANDOM_COMMENT = Math.floor(Math.random() * commentsData.length);
    return commentsData[RANDOM_COMMENT];
}

const getRandomLikes = (MAX_NUMBER_LIKES, MIN_NUMBER_LIKES) => {
    console.log(MAX_NUMBER_LIKES);
    console.log(MIN_NUMBER_LIKES);
    console.log(Math.floor(Math.random() * (MAX_NUMBER_LIKES - MIN_NUMBER_LIKES)) + MIN_NUMBER_LIKES);
    return Math.floor(Math.random() * (MAX_NUMBER_LIKES - MIN_NUMBER_LIKES)) + MIN_NUMBER_LIKES;
}

const getRandomName = (usersName) => {
    const RANDOM_NAME = Math.floor(Math.random() * usersName.length);
    return usersName[RANDOM_NAME];
}

const generatePhotosData = () => {
    for (let index = 0; index < photosUrls.length; index++) {
        usersData.push({
            comments: getRandomComment(commentsData),
            likes: getRandomLikes(),
            name: getRandomName(usersName),
            picture: photosUrls[index]
        })
    }
}

const createPicture = (picture, index) => {
    const image = pictureTemplate.cloneNode(true);

    image.querySelector('.picture__comments').textContent = picture.comments;
    image.querySelector('.picture__likes').textContent = picture.likes;
    image.querySelector('.picture__img').src = picture.url;

    return image;
}

usersData.forEach((picture, index) => {
    picturesFragment.appendChild(createPicture(picture, index));
});

console.log(usersData);
generatePhotosData();
createPicture();