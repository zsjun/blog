Function.prototype._call = (context) => {
  context = context || window;
  context.selfFn = this;
  let arg = [...arguments].slice(1);
  context.selfFn(...arg);
  delete context.selfFn;
};

Function.prototype._apply = (context) => {
  context = context || window;
  context.selfFn = this;
  let arg = [...arguments].slice(1);
  context.selfFn(arg);
  delete context.selfFn;
};

Function.prototype._bind = (context) => {
  const self = this;
  const args1 = [...arguments].slice(1);
  return function() {
    const args = [...arguments];
    self.apply(context, args.cancat(args1));
  };
};
