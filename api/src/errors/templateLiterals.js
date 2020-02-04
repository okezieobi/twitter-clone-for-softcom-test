export default class Errors {
  static isRequired(title) {
    return `${title} is required`;
  }

  static wrongCharLength(title, length) {
    return `${title} must be less than ${length} characters`;
  }

  static notVarChar(title) {
    return this.wrongCharLength(title, 128);
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

  static isStringType(title) {
    return `${title} must be string data type`;
  }

  static notTweetOrReply(tweetOrReply) {
    return this.wrongCharLength(tweetOrReply, 280);
  }
}
