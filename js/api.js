const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  'GET': '/data',
  'POST': '/'
};

const load = (onSuccess, onError, method = 'GET', body = null) =>
  fetch(BASE_URL + Route[method], { method, body })
    .then((request) => request.json())
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));


const getData = (onSuccess, onError) => load(onSuccess, onError);
const sendData = (onSuccess, onError, body) => load(onSuccess, onError, 'POST', body);

export { getData, sendData };
