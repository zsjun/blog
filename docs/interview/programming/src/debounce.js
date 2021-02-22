function debounce(fn, delay) {
  let timer = -1;
  delay = delay || 300;
  return function() {
    const _self = this;
    const _args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(_self, _args);
    }, delay);
  };
}
