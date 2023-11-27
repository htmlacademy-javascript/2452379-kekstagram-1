const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные',
  SEND_DATA: 'Ошибка загрузки файла'
};

const load = (route, errorText, method = 'GET', body = null) =>
  fetch(BASE_URL + route, { method, body })
    .then((request) => {
      if (request.ok) {
        return request.json();
      }

      throw new Error();
    })
    .catch(() => {
      throw new Error(errorText);
    });


const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);
const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, 'POST', body);

export { getData, sendData };
