// import DOMRender from './Render';
// import User from './User';

// DOMRender.render(User, document.getElementById('app'));

import { EventTargetListener } from './EventTarget';

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
