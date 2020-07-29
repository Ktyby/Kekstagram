"use strict";

(() => {
  const GET_URL = "https://javascript.pages.academy/kekstagram/data";
  const POST_URL = "https://javascript.pages.academy/kekstagram";
  const MAX_LOADING_TIME = 10000;
  const SUCCESS_STATUS = 200;

  const getData = (handleLoad, handleError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.timeout = MAX_LOADING_TIME;

    xhr.addEventListener("load", (() => {
      if (xhr.status === SUCCESS_STATUS) {
        handleLoad(xhr.response);
      } else {
        handleError(`Произошла ошибка при загрузке данных: ${xhr.status} ${xhr.statusText}`);
      }
    }));

    xhr.addEventListener("error", (() => {
      handleError("Произошла ошибка при загрузке данных");
    }));

    xhr.addEventListener("timeout", (() => {
      handleError(`Запрос не успел обработаться за ${MAX_LOADING_TIME}мс`);
    }));

    xhr.open("GET", GET_URL);
    xhr.send();
  }

  const sendData = (data, handleLoad, handleError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.timeout = MAX_LOADING_TIME;

    xhr.addEventListener("load", (() => {
      if (xhr.status === SUCCESS_STATUS) {
        handleLoad();
      } else {
        handleError(`Произошла ошибка при загрузке данных: ${xhr.status} ${xhr.statusText}`);
      }
    }));

    xhr.addEventListener("error", (() => {
      handleError("Не удалось отправить данные, попробуйте позже");
    }));

    xhr.addEventListener("timeout", (() => {
      handleError(`Запрос не успел обработаться за ${MAX_LOADING_TIME}мс`);
    }));

    xhr.open("POST", POST_URL);
    xhr.send(data);
  }

  window.backend = {
    getData,
    sendData
  }
})()