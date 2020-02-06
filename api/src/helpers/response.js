export default class HttpResponse {
  constructor() {
    this.err400Res = this.err400Res.bind(this);
    this.err404Res = this.err404Res.bind(this);
    // this.err403Res = this.err403Res.bind(this);
    this.success200Res = this.success200Res.bind(this);
    // this.success200ResMessage = this.success200ResMessage.bind(this);
    this.success201Res = this.success201Res.bind(this);
    this.auth201Res = this.auth201Res.bind(this);
    this.auth200Res = this.auth200Res.bind(this);
  }

  static responseData(codeStatus, resKey, resValue) {
    const resData = {
      status: codeStatus,
      [resKey]: resValue,
    };
    return resData;
  }

  static response(res, codeStatus, resKey, resValue) {
    const response = this.responseData(codeStatus, resKey, resValue);
    res.status(codeStatus).send(response);
  }

  static authResponse(res, codeStatus, resKey, resValue, token) {
    const authResponse = this.responseData(codeStatus, resKey, resValue);
    authResponse.token = token;
    res.status(codeStatus).set('token', authResponse.token).send(authResponse);
  }

  err400Res(res, err400Message) {
    return this.constructor.response(res, 400, 'error', err400Message);
  }

  err404Res(res, err404Message) {
    return this.constructor.response(res, 404, 'error', err404Message);
  }

  /*
  err403Res(res, err403Message) {
    return this.constructor.response(res, 403, 'error', err403Message);
  }
  */

  success200Res(res, success200Data) {
    return this.constructor.response(res, 200, 'data', success200Data);
  }

  /*
  success200ResMessage(res, success200Message) {
    return this.constructor.response(res, 200, 'message', success200Message);
  }
  */

  success201Res(res, success201Data) {
    return this.constructor.response(res, 201, 'data', success201Data);
  }

  auth201Res(res, auth201Data, token) {
    return this.constructor.authResponse(res, 201, 'data', auth201Data, token);
  }

  auth200Res(res, auth201Data, token) {
    return this.constructor.authResponse(res, 200, 'data', auth201Data, token);
  }
}
