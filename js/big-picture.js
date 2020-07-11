"use strict";

(() => {
	// Константа //

	const MAX_SHOWN_COMMENTS_COUNT = 5;

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

	window.renderBigPicture = renderBigPicture;
})()