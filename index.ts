// import DOMRender from './Render';
// import User from './User';

// DOMRender.render(User, document.getElementById('app'));

import { EventTargetListener } from './EventTarget';
import { MyError, MyError2 } from './Validators';

function test(value) {
  console.log({ value }, { date: new Date() });
}

EventTargetListener.dispatchEvent({ type: 'render' });
EventTargetListener.addEventListener('render', () => {
  test(12);
});
EventTargetListener.addEventListener('render', () => {
  test(25);
});

EventTargetListener.dispatchEvent({ type: 'render' });

try {
  throw new MyError2('adasdasasd');
} catch (err) {
  if (err instanceof MyError) {
    console.log('1');
  }

  if (err instanceof MyError2) {
    console.log('2', err.message);
  }
}
