import logLevel from 'loglevel';

export default class Logs {
  static displayErrors(error) {
    return logLevel.error(error);
  }

  static displayInfo(info) {
    return logLevel.warn(info);
  }
}
