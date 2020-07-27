"use strict";

(() => {
	const MAX_SHOW_COMMENTS_COUNT = 5;

	const bigPicture = document.querySelector(".big-picture");
	const closeButton = bigPicture.querySelector(".big-picture__cancel");
	const image = bigPicture.querySelector(".big-picture__img img");
	const commentsCount = bigPicture.querySelector(".comments-count");
	const socialCaption = bigPicture.querySelector(".social__caption");
	const likesCount = bigPicture.querySelector(".likes-count");
	const commentsList = bigPicture.querySelector(".social__comments");
	const commentsLoader = document.querySelector(".comments-loader");
	const shownCommentsCount = commentsCount.previousSibling;

	const renderBigPicture = (pictureID) => {
		let commentCount = MAX_SHOW_COMMENTS_COUNT;

		const currentPictureData = window.data[pictureID];

		const assignDataForBigPicture = () => {  
			image.src = currentPictureData.url;
			commentsCount.textContent = currentPictureData.comments.length;
			socialCaption.textContent = currentPictureData.description;
			likesCount.textContent = currentPictureData.likes;
		}
	
		const renderComments = (commentsCount) => {
			window.utils.clearContentsOfElement(commentsList); // Удаление первого комментария из вёрстки

			const createComments = () => {
				const fragment = new DocumentFragment();
			
				const createComment = (index) => {
					const createCommentWrapper = () => {
						const newComment = document.createElement('li');
						newComment.classList.add("social__comment");
		
						return newComment;
					}
					
					const createAvatar = () => {
						const avatar = document.createElement("img");
						avatar.classList.add("social__picture");
	
						avatar.src = currentPictureData.comments[index].avatar; 
						
						return avatar;
					}
	
					const createMessage = () => {
						const message = document.createElement("p");
						message.classList.add("social__text");
	
						message.textContent = currentPictureData.comments[index].message; 
	
						return message;
					}
	
					const commentWrapper = createCommentWrapper();
					commentWrapper.append(createAvatar(),createMessage());
					return commentWrapper;
				}
							
				const maxShowCommentCount = Math.min(currentPictureData.comments.length, commentsCount);
	
				for (let index = 0; index < maxShowCommentCount; index++) {
					fragment.append(createComment(index));
				}
				 
				return fragment;
			}
					
			commentsList.append(createComments());

			const showCommentCount = () => {
				commentCount += MAX_SHOW_COMMENTS_COUNT;
	
				shownCommentsCount.textContent = `${commentsCount} из `;
	
				if (commentsCount >= currentPictureData.comments.length) {
					window.utils.hideElement(commentsLoader);
					shownCommentsCount.textContent = `${currentPictureData.comments.length} из `;
				}
			}

			showCommentCount();
		}

		const handleLoadCommentsClick = () => {
			renderComments(commentCount);
		}

		const hideBigPicture = () => {
			window.utils.showElement(commentsLoader);
			window.utils.hideElement(bigPicture);
			removeBigPictureListeners();
		}

		const hendleHideBigPictureClick = () => {
			hideBigPicture();
		}

		const handleHideBigPictureKeyDown = (downEvt) => {
			window.utils.isEscapeEvent(downEvt, () => {
				hideBigPicture();
			});
		}
		
		const setBigPictureListeners = () => {
			commentsLoader.addEventListener("click", handleLoadCommentsClick);
			closeButton.addEventListener("click", hendleHideBigPictureClick);
			document.addEventListener("keydown", handleHideBigPictureKeyDown);
		}

		const removeBigPictureListeners = () => {
			commentsLoader.removeEventListener("click", handleLoadCommentsClick);
			closeButton.removeEventListener("click", hendleHideBigPictureClick);
			document.removeEventListener("keydown", handleHideBigPictureKeyDown);
		}

		renderComments(MAX_SHOW_COMMENTS_COUNT);
		assignDataForBigPicture();
		window.utils.showElement(bigPicture);
		setBigPictureListeners();
	}

	window.renderBigPicture = renderBigPicture;
})()