class EventHandler {
  constructor() {
    this._eventHandlers = {};
  }

  addEventListener(eventName, eventHandler) {
    if (this._eventHandlers[eventName]) {
      this._eventHandlers[eventName].push(eventHandler);
    } else {
      this._eventHandlers[eventName] = [eventHandler];
    }
  }

  dispatchEvent(eventName, ...args) {
    if (this._eventHandlers[eventName]) this._eventHandlers[eventName].forEach(handler=>handler(...args));
  }
}
