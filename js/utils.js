const isEsc = (evt) => evt.key === 'Escape';

const onEscKeydownDo = (cb, exp = null) => ((evt) => {
  if (isEsc(evt) && (exp ? exp(evt) : true)) {
    evt.preventDefault();
    cb();
  }
});

const onOverElementBoundsClickDo = (cb, selector) => ((evt) => {
  if (!evt.target.closest(selector)) {
    cb();
  }
});

export { onEscKeydownDo, onOverElementBoundsClickDo };
