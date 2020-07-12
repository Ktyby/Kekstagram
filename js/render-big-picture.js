"use strict";

(() => {
	const MAX_SHOWN_COMMENTS_COUNT = 5;

	const bigPicture = document.querySelector(".big-picture");
	const image = bigPicture.querySelector(".big-picture__img img");
	const commentsCount = bigPicture.querySelector(".comments-count");
	const socialCaption = bigPicture.querySelector(".social__caption");
	const likesCount = bigPicture.querySelector(".likes-count");
	const commentsList = bigPicture.querySelector(".social__comments");
	const socialCommentCount = document.querySelector(".social__comment-count");
	const commentsLoader = document.querySelector(".comments-loader");

	const renderBigPicture = (pictureID) => {
		const assignDataForBigPicture = () => {  
			image.src = picturesData[pictureID].image;
			commentsCount.textContent = picturesData[pictureID].comments.length;
			socialCaption.textContent = picturesData[pictureID].description;
			likesCount.textContent = picturesData[pictureID].likes;
		}
	
		const renderCommentsForBigPicture = (pictureID) => {
			window.utils.clearContentsOfElement(commentsList); // Удаление первого комментария из вёрстки
			
			const createComments = (pictureID) => {
				const fragment = new DocumentFragment();
			
				const createComment = (index) => {
					const createCommentItem = () => {
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
	
					const commentWrapper = createCommentItem();
					commentWrapper.append(createAvatar(),createMessage());
					return commentWrapper;
				}
							
				const maxShowCommentCount = Math.min(picturesData[pictureID].comments.length, MAX_SHOWN_COMMENTS_COUNT);
	
				for (let index = 0; index < maxShowCommentCount; index++) {
					fragment.append(createComment(index));
				}
				 
				return fragment;
			}
					
			commentsList.append(createComments(pictureID));
		}
		
		const hideCommentsCounter = () => {
			socialCommentCount.classList.add("visually-hidden");
			commentsLoader.classList.add("visually-hidden");
		}
		
		renderCommentsForBigPicture(pictureID);
		assignDataForBigPicture();
		window.utils.showElement(bigPicture);
		hideCommentsCounter();
	}

	window.renderBigPicture = renderBigPicture;
})()