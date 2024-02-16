// EventEmitter.js
class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);

    return () => {
      this.events[eventName] = this.events[eventName].filter(
        (eventCallback) => eventCallback !== callback
      );
    };
  }

  emit(eventName, data) {
    const callbacks = this.events[eventName] || [];
    callbacks.forEach((callback) => callback(data));
  }
}

export default new EventEmitter();
