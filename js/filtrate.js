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
    const newPictureArray = defaultData.slice();
    
    const getRandomSortOfArray = () => {
      return 0.5 - Math.random()
    }

    newPictureArray.sort(getRandomSortOfArray).splice(0, newPictureArray.length - MAX_NEW_PICTURES_COUNT);

    return newPictureArray;
  }

  const getDiscussedPictureArray = () => {
    const discussedPictureArray = defaultData.slice();
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
        window.data = getNewPictureArray();
        break;
      case Filter.DISCUSSED:
        window.data = getDiscussedPictureArray();
        break;
    }

    window.avoidDebounce(renderFiltratedPicture);
    evt.target.classList.add("img-filters__button--active");
  }
 
  window.filtrate = filtrate;
})();