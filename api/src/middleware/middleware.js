/* eslint-disable no-console */
export default class Middleware {
  static callBack(method) {
    return (...args) => method(...args);
  }

  static routeCallbacks(...methods) {
    return methods.map((method) => Middleware.callBack(method));
  }
}
