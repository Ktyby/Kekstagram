"use strict";

(() => {
	// Константы //

	const MIN_NUMBER_COMMENTS = 0;
	const MAX_NUMBER_COMMENTS = 20;
	const MIN_INDEX_AVATAR = 0;
	const MIN_INDEX_MESSAGE = 0;
	const MIN_INDEX_NAME = 0;
	const MAX_SHOWN_MINIATURS_COUNT = 25;
	const MIN_NUMBER_LIKES = 15;
	const MAX_NUMBER_LIKES = 200;
	const MIN_INDEX_DESCRIPTION = 0;

	// Массивы данных //

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

	// Получение рандома //

	const getRandomIntegerFromRange = (minValue, maxValue) => {
		return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
	}

	// Генерация данных в picturesData //

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

	generatePicturesData();
	window.picturesData = picturesData;
})()