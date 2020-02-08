import Logger from '../helpers/logger';

const { displayErrors } = Logger;

export default class Middleware {
  constructor() {
    this.callBackFactory = this.callBackFactory.bind(this);
    this.routeCallbacks = this.routeCallbacks.bind(this);
  }

  callBackFactory(method) {
    this.method = method;
    try { return this.method; } catch (error) { return displayErrors(error); }
  }

  routeCallbacks(...methods) {
    return methods.map((method) => (...args) => { this.callBackFactory(method(...args)); });
  }
}
