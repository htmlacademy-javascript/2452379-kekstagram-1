import { renderPictures } from './pictures.js';
import { getData } from './api.js';
import { showMessage } from './messages.js';

import './form.js';

getData()
  .then((pictures) => renderPictures(pictures))
  .catch((err) => showMessage(err.message, 'ERROR'));
