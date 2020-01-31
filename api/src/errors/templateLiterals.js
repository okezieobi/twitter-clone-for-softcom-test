export default class Errors {
  static isRequired(title) {
    return `${title} is required`;
  }

  static notVarChar(title) {
    return `${title} must be less than 128 characters`;
  }

  static notNumbers(title) {
    return `${title} must be a positive number`;
  }

  static notInteger(title) {
    return `${title} must be a positive integer`;
  }

  static restrictedAccess(title) {
    return `Only ${title} can access this resource`;
  }

  static dataNotFound(title) {
    return `${title} not found`;
  }


  static dataFound(title) {
    return `${title} already exists`;
  }
}
