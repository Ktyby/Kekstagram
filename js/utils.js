"use strict";

(() => {
  const Key = {
    ENTER: "Enter",
    ESCAPE: "Escape"
  }

  const clearContentsOfElement = (element) => {
    element.innerHTML = "";
  }
  
  const hideElement = (element) => {
    element.classList.add("hidden");
  }

  const showElement = (element) => {
    element.classList.remove("hidden");
  }
  
  const isEscapeEvent = (evt, callback) => {
    if (evt.code === Key.ESCAPE) {
      callback(evt);
    }
  } 
  
  const isEnterEvent = (evt, callback) => {
    if (evt.code === Key.ENTER) {
      callback(evt);
    }
  }

  const getRandomIntegerFromRange = (minValue, maxValue) => {
    return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
  }

  window.utils = {
    showElement,
    hideElement,
    clearContentsOfElement,
    isEnterEvent,
    isEscapeEvent,
    getRandomIntegerFromRange
  };
})()