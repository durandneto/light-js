export class MyError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class MyError2 extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function MyError3() {
  const err = Error.apply(this, arguments);
  this.name = 'MyError';
  this.message = err.message;
  this.stack = err.stack;
}
