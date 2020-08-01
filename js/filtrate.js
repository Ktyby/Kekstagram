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

  const filtrate = (data) => {
    defaultData = data; 

    pictureFilterButtons.forEach((button) => {
      button.addEventListener("click", handleFilterClick);  
    });
  }

  const removePreviousFilter = () => {
    const pictures = document.querySelectorAll('.picture');

    pictures.forEach((picture) => picture.remove());
  }

  const getNewPicturesArray = () => {
    const allPictures = [...defaultData];
    const newPicturesArray = [];
    let indexNewPicture;

    for (let i = 0; i < MAX_NEW_PICTURES_COUNT; i++) {
      indexNewPicture = window.utils.getRandomIntegerFromRange(0, allPictures.length);
      newPicturesArray.push(allPictures.splice(indexNewPicture, 1)[0]);
    }

    return newPicturesArray;
  }

  const getDiscussedPictureArray = () => {
    const discussedPictureArray = [...defaultData];
    discussedPictureArray.sort((firstElement, secondElement) => {
      return (secondElement.comments.length - firstElement.comments.length) || (secondElement.likes - firstElement.likes);
    });

    return discussedPictureArray;
  }

  const renderFiltratedPicture = () => {
    removePreviousFilter();
    window.renderAllPictures(window.data);
  }
  
  const handleFilterClick = (evt) => {
    switch (evt.target.id) {
      case Filter.POPULAR:
        window.data = defaultData;
        break;
      case Filter.NEW:
        window.data = getNewPicturesArray();
        break;
      case Filter.DISCUSSED:
        window.data = getDiscussedPictureArray();
        break;
    }

    window.avoidDebounce(renderFiltratedPicture);

    pictureFilterButtons.forEach((button) => {
      button.classList.remove('img-filters__button--active');
    });

    evt.target.classList.add("img-filters__button--active");
  }
 
  window.filtrate = filtrate;
})();