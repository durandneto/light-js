import { EventTargetListener } from './EventTarget';

function test(value) {
  console.log({ value }, { date: new Date() });
}

EventTargetListener.addEventListener('render', () => {
  test(12);
});
EventTargetListener.addEventListener('render', () => {
  test(25);
});

EventTargetListener.dispatchEvent({ type: 'render' });
