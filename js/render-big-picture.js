"use strict";

(() => {
	const SHOWN_COMMENTS_STEP = 5;
  const AVATAR_WIDTH = 35;
  const AVATAR_HEIGHT = 35;

	const body = document.querySelector("body");
	const bigPicture = body.querySelector(".big-picture");
	const closeButton = bigPicture.querySelector(".big-picture__cancel");
	const image = bigPicture.querySelector(".big-picture__img img");
	const commentsCount = bigPicture.querySelector(".comments-count");
	const socialCaption = bigPicture.querySelector(".social__caption");
	const likesCount = bigPicture.querySelector(".likes-count");
	const commentsList = bigPicture.querySelector(".social__comments");
	const commentsLoader = document.querySelector(".comments-loader");
	const shownCommentsCount = commentsCount.previousSibling;
	let firstIndexOfComment = 0;

	const assignDataForBigPicture = (currentPictureData) => {  
		image.src = currentPictureData.url;
		commentsCount.textContent = currentPictureData.comments.length;
		socialCaption.textContent = currentPictureData.description;
		likesCount.textContent = currentPictureData.likes;
	}

	const renderComments = (pictureID) => {
		const comments = window.data[pictureID].comments;
		let indexOfComment = firstIndexOfComment + SHOWN_COMMENTS_STEP;
		const fragment = new DocumentFragment();
	
		if (indexOfComment > comments.length) {
			indexOfComment = comments.length;
			window.utils.hideElement(commentsLoader);
		}

		const createComment = (commentObj) => {
			const createCommentWrapper = () => {
				const newComment = document.createElement("li");
				newComment.classList.add("social__comment");

				return newComment;
			}
			
			const createAvatar = () => {
				const avatar = document.createElement("img");
				avatar.classList.add("social__picture");

				avatar.src = commentObj.avatar; 
				avatar.width = AVATAR_WIDTH;
				avatar.height = AVATAR_HEIGHT;
				avatar.alt = "Аватар автора комментария";
				
				return avatar;
			}

			const createMessage = () => {
				const message = document.createElement("p");
				message.classList.add("social__text");

				message.textContent = commentObj.message; 

				return message;
			}

			const commentWrapper = createCommentWrapper();
			commentWrapper.append(createAvatar(),createMessage());
			fragment.append(commentWrapper);
		}

		comments.slice(firstIndexOfComment, indexOfComment).forEach(createComment);
		commentsList.append(fragment);
		shownCommentsCount.textContent = `${indexOfComment} из `;
	
		firstIndexOfComment = indexOfComment;
	}

	const renderBigPicture = (pictureID) => {
		window.utils.clearContentsOfElement(commentsList);
		const currentPictureData = window.data[pictureID];

		const hideBigPicture = () => {
			firstIndexOfComment = 0;
	
			body.classList.remove("modal-open");
			window.utils.showElement(commentsLoader);
			window.utils.hideElement(bigPicture);
			removeBigPictureListeners();
		}
	
		const handleHideBigPictureClick = () => {
			hideBigPicture();
		}
	
		const handleHideBigPictureKeyDown = (downEvt) => {
			window.utils.isEscapeEvent(downEvt, hideBigPicture)
		}
	
		const handleLoadCommentsClick = () => {
			renderComments(pictureID);
		}

		const setBigPictureListeners = () => {
			commentsLoader.addEventListener("click", handleLoadCommentsClick);
			closeButton.addEventListener("click", handleHideBigPictureClick);
			document.addEventListener("keydown", handleHideBigPictureKeyDown);
		}
	
		const removeBigPictureListeners = () => {
			commentsLoader.removeEventListener("click", handleLoadCommentsClick);
			closeButton.removeEventListener("click", handleHideBigPictureClick);
			document.removeEventListener("keydown", handleHideBigPictureKeyDown);
		}

		renderComments(pictureID);
		assignDataForBigPicture(currentPictureData);
		window.utils.showElement(bigPicture);
		setBigPictureListeners();
	}

	window.renderBigPicture = renderBigPicture;
})()