"use strict";

(() => {
  const MAX_NEW_PICTURES_COUNT = 10;

  const pictureFilter = document.querySelector(".img-filters");
  const pictureFilterButtons = pictureFilter.querySelectorAll(".img-filters__button");

  pictureFilter.classList.remove("img-filters--inactive");

  const Filter ={
    POPULAR: "filter-popular",
    NEW: "filter-new",
    DISCUSSED: "filter-discussed"
  }

  let defaultData = [];

  const filtrate = () => {
    defaultData = window.data; 
    pictureFilterButtons.forEach((button) => {
      button.addEventListener("click", handleFilterClick);  
    });
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
      newPicturesArray.splice(window.utils.getRandomIntegerFromRange(0, newPicturesArray.length), 1);
    }

    return newPicturesArray;
  }

  const getDiscussedPictureArray = () => {
    const discussedPictureArray = defaultData.slice();
    discussedPictureArray.sort((firstElement, secondElement) => {
      let result = secondElement.comments.length - firstElement.comments.length;
      return result === 0 ? secondElement.likes - firstElement.likes : result;
    });

    return discussedPictureArray;
  }

  const renderFiltratedPicture = () => {
    window.renderAllPictures(window.data)
  }
  
  const handleFilterClick = (evt) => {
    switch (evt.target.id) {
      case Filter.POPULAR:
        window.data = defaultData;
        break;
      case Filter.NEW:
        window.data = getNewPictureArray();
        break;
      case Filter.DISCUSSED:
        window.data = getDiscussedPictureArray();
        break;
    }

    removePreviousFilter();
    window.avoidDebounce(renderFiltratedPicture);
    evt.target.classList.add("img-filters__button--active");
  }
 
  window.filtrate = filtrate;
})();