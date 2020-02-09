export default class Middleware {
  static routeCallbacks(...methods) {
    return methods.map((method) => (...args) => { method(...args); });
  }
}
