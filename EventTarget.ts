import { Queue } from './Queue';

export const EventTarget = function() {
  this.listeners = {};
};

EventTarget.prototype.listeners = null;
EventTarget.prototype.addEventListener = function(type, callback) {
  Promise.resolve(true).then(() => {
    if (!(type in this.listeners)) {
      this.listeners[type] = new Queue();
    }
    this.listeners[type].enqueue(callback);
  });
};

EventTarget.prototype.removeEventListener = function(type, callback) {
  setTimeout(() => {
    if (!(type in this.listeners)) {
      return;
    }
    const stack = this.listeners[type];
    for (let i = 0, l = stack.length; i < l; i++) {
      if (stack[i] === callback) {
        stack.splice(i, 1);
        return;
      }
    }
  }, 0);
};

EventTarget.prototype.dispatchEvent = function(event) {
  setTimeout(() => {
    if (!(event.type in this.listeners)) {
      return true;
    }

    const q = this.listeners[event.type];
    while (!q.isEmpty()) {
      q.dequeue()();
    }
  }, 0);
  return !event.defaultPrevented;
};

export const EventTargetListener = new EventTarget();
