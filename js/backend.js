"use strict";

(() => {
  const GET_URL = "https://javascript.pages.academy/kekstagram/data";
  const POST_URL = 'https://javascript.pages.academy/kekstagram';

  const getDataFromServer = (handleLoad, handleError) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", GET_URL);    

    const handleRequestLoad = () => {
      handleLoad(xhr.responseText);
    }

    const handleRequestError = () => {
      handleError("Произошла ошибка при загрузке данных");
    }

    xhr.addEventListener("load", handleRequestLoad);
    xhr.addEventListener("error", handleRequestError);

    xhr.send();
  }

  const sendDataToServer = (data, handleLoad, handleError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    const handleRequestLoad = () => {
      handleLoad();
    }

    const handleRequestError = () => {
      handleError("Не удалось отправить данные, попробуйте позже)");
    }

    xhr.addEventListener("load", handleRequestLoad);
    xhr.addEventListener("error", handleRequestError);

    xhr.open("POST", POST_URL);
    xhr.send(data);
  }

  window.backend = {
    getDataFromServer,
    sendDataToServer
  }
})()