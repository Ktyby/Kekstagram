"use strict";

(() => {
  const GET_URL = "https://javascript.pages.academy/kekstagram/data";
  const POST_URL = 'https://javascript.pages.academy/kekstagram';
  const MAX_LOADING_TIME = 10000;

  const getData = (handleLoad, handleError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.timeout = MAX_LOADING_TIME;

    xhr.open("GET", GET_URL);    

    const handleRequestLoad = () => {
      handleLoad(xhr.response);
    }

    const handleRequestError = () => {
      handleError("Произошла ошибка при загрузке данных");
    }

    const handleRequestTimeoutError = () => {
      handleError(`Запрос не успел обработаться за ${MAX_LOADING_TIME}мс`);
    }

    xhr.addEventListener("load", handleRequestLoad);
    xhr.addEventListener("error", handleRequestError);
    xhr.addEventListener("timeout", handleRequestTimeoutError);

    xhr.send();
  }

  const sendData = (data, handleLoad, handleError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.timeout = MAX_LOADING_TIME;

    const handleRequestLoad = () => {
      handleLoad();
    }

    const handleRequestError = () => {
      handleError("Не удалось отправить данные, попробуйте позже");
    }

    const handleRequestTimeoutError = () => {
      handleError(`Запрос не успел обработаться за ${MAX_LOADING_TIME}мс`);
    }

    xhr.addEventListener("load", handleRequestLoad);
    xhr.addEventListener("error", handleRequestError);
    xhr.addEventListener("timeout", handleRequestTimeoutError);

    xhr.open("POST", POST_URL);
    xhr.send(data);
  }

  window.backend = {
    getData,
    sendData
  }
})()