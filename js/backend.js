"use strict";

(() => {
  const GET_URL = "https://javascript.pages.academy/kekstagram/data";
  const POST_URL = 'https://javascript.pages.academy/kekstagram';

  const getData = (handleLoad, handleError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.open("GET", GET_URL);    

    const handleRequestLoad = () => {
      handleLoad(xhr.response);
    }

    const handleRequestError = () => {
      handleError("Произошла ошибка при загрузке данных");
    }

    xhr.addEventListener("load", handleRequestLoad);
    xhr.addEventListener("error", handleRequestError);

    xhr.send();
  }

  const sendData = (data, handleLoad, handleError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    const handleRequestLoad = () => {
      handleLoad();
    }

    const handleRequestError = () => {
      handleError("Не удалось отправить данные, попробуйте позже");
    }

    xhr.addEventListener("load", handleRequestLoad);
    xhr.addEventListener("error", handleRequestError);

    xhr.open("POST", POST_URL);
    xhr.send(data);
  }

  window.backend = {
    getData,
    sendData
  }
})()