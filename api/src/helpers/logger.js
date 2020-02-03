import logLevel from 'loglevel';

const { error, warn } = logLevel;

export default class Logs {
  static displayErrors(errorInfo) {
    return error(errorInfo);
  }

  static displayInfo(info) {
    return warn(info);
  }
}
