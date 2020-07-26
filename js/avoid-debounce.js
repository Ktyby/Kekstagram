"use strict";

(() => {
  const RENDERING_LIMIT = 500;
  
  let renderingTimeout;

  const avoidDebounce = (callback) => {
    if (renderingTimeout) {
      clearTimeout(renderingTimeout);
    }

    renderingTimeout = setTimeout(callback, RENDERING_LIMIT);
  }

  window.avoidDebounce = avoidDebounce;
})();