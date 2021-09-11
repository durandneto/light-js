export const EventTarget = function() {
  this.listeners = {};
};

EventTarget.prototype.listeners = null;
EventTarget.prototype.addEventListener = function(type, callback) {
  if (!(type in this.listeners)) {
    this.listeners[type] = [];
  }
  this.listeners[type].push(callback);
};

EventTarget.prototype.removeEventListener = function(type, callback) {
  if (!(type in this.listeners)) {
    return;
  }
  var stack = this.listeners[type];
  for (var i = 0, l = stack.length; i < l; i++) {
    (n => {
      setTimeout(() => {
        if (stack[n] === callback) {
          stack.splice(n, 1);
          return;
        }
      }, 0);
    })(i);
  }
};

EventTarget.prototype.dispatchEvent = function(event) {
  if (!(event.type in this.listeners)) {
    return true;
  }
  // console.log("dispatchEvent", event);
  var stack = this.listeners[event.type].slice();

  for (var i = 0, l = stack.length; i < l; i++) {
    (n => {
      setTimeout(() => {
        stack[n].call(this, event);
      }, 0);
    })(i);
  }
  return !event.defaultPrevented;
};

export const EventTargetListener = new EventTarget();
