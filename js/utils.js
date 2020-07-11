"use strict";

(() => {
  const ENTER = "Enter";
  const ESCAPE = "Escape";

  const clearContentsOfElement = (element) => {
    element.innerHTML = "";
  }
  
  const hideElement = (element) => {
    element.classList.add("hidden");
  }
  
  const isEscapeEvent = (evt, callback) => {
    if (evt.code === ESCAPE) {
      callback(evt);
    }
  }
  
  const showElement = (element) => {
    element.classList.remove("hidden");
  }
  
  
  const isEnterEvent = (evt, callback) => {
    if (evt.code === ENTER) {
      callback(evt);
    }
  }

  window.utils = {
    showElement,
    hideElement,
    clearContentsOfElement,
    isEnterEvent,
    isEscapeEvent
  };
})()