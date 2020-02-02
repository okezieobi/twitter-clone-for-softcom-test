export default class Errors {
  static userNotExists() {
    return 'User does not exist, please sign up';
  }

  static userExists() {
    return 'User exists, please sign in with email or username';
  }

  static notEmail() {
    return 'Email format is wrong OR is more than 128 characters';
  }

  static notPassword() {
    return 'Password must be eight characters minimum, 128 characters maximum';
  }

  static tokenIsRequired() {
    return 'Token is required, please sign in or sign up';
  }

  static notJWT() {
    return 'Token provided is does not match JWT format';
  }

  static wrongToken() {
    return 'Token provided does not match any user';
  }

  static invalidToken() {
    return 'Id from token is not a positive integer';
  }

  static wrongPassword() {
    return 'Password does not match user';
  }
}
