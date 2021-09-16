export function MyError() {
  const err = Error.apply(this, arguments);
  this.name = 'MyError';
  this.message = err.message;
  this.stack = err.stack;
}
MyError.prototype = Error.prototype;

export function MyError2() {
  const err = Error.apply(this, arguments);
  this.name = 'MyError2';
  this.message = err.message;
  this.stack = err.stack;
}
MyError.prototype = Error.prototype;
