"use strict";

(() => {
  // Константы //

  const ENTER = "Enter";
  const ESCAPE = "Escape";
  
  // Функции общего назначения //

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

  window.showElement = showElement;
  window.hideElement = hideElement;
  window.clearContentsOfElement = clearContentsOfElement;
  window.isEnterEvent = isEnterEvent;
  window.isEscapeEvent = isEscapeEvent;
})()