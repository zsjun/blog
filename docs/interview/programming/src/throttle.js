function throttle(fn, delay) {
  delay = delay || 300;
  let oldTime = new Date().getTime();
  return function() {
    const _self = this;
    const _args = arguments;
    const newTime = new Date().getTime();
    if (newTime - oldTime > delay) {
      fn.apply(_self, _args);
      oldTime = newTime;
    }
  };
}
