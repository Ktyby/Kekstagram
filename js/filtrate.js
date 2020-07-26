"use strict";

(() => {
  const MAX_NEW_PICTURES_COUNT = 10;

  const pictureFilter = document.querySelector(".img-filters");
  const pictureFilterButtons = pictureFilter.querySelectorAll(".img-filters__button");

  pictureFilter.classList.remove("img-filters--inactive");

  const filtrate = () => {  
    let defaultData = window.data;

    const getRandomIntegerFromRange = (minValue, maxValue) => {
      return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
    }

    const removePreviousFilter = () => {
      const pictures = document.querySelectorAll('.picture');
  
      pictureFilterButtons.forEach((button) => {
        button.classList.remove('img-filters__button--active');
      });
  
      pictures.forEach((picture) => picture.remove());
    }

    const getNewPictureArray = () => {
      const newPicturesArray = defaultData.slice();

      for (let index = defaultData.length; index > MAX_NEW_PICTURES_COUNT; index--) {
        newPicturesArray.splice(getRandomIntegerFromRange(0, newPicturesArray.length), 1);
      }

      return newPicturesArray;
    }

    const getDiscussedPictureArray = () => {
      const discussedPictureArray = defaultData.slice();
      discussedPictureArray.sort((firstElement, secondElement) => {
        let result = secondElement.comments.length - firstElement.comments.length;

        if (result === 0) {
          result = secondElement.likes - firstElement.likes;
        }

        return result;
      });

      return discussedPictureArray;
    }

    const renderFiltratedPicture = () => {
      window.renderAllPictures(window.data)
    }

    const handleFilterClick = (evt) => {
      switch (evt.target.id) {
        case "filter-popular":
          window.data = defaultData;
          break;
        case "filter-new":
          window.data = getNewPictureArray(evt.target);
          break;
        case "filter-discussed":
          window.data = getDiscussedPictureArray(evt.target);
          break;
      }

      removePreviousFilter();
      window.avoidDebounce(renderFiltratedPicture);
      evt.target.classList.add("img-filters__button--active");
    }

    pictureFilterButtons.forEach((button) => {
      button.addEventListener("click", handleFilterClick);  
    });
  }
 
  window.filtrate = filtrate;
})();