export default class HttpResponse {
  static responseData(codeStatus, resKey, resValue) {
    const resData = {
      status: codeStatus,
      [resKey]: resValue,
    };
    return resData;
  }

  static response(res, codeStatus, resKey, resValue) {
    const response = HttpResponse.responseData(codeStatus, resKey, resValue);
    res.status(codeStatus).send(response);
  }

  static authResponse(res, codeStatus, resKey, resValue, token) {
    const authResponse = HttpResponse.responseData(codeStatus, resKey, resValue);
    authResponse.token = token;
    res.status(codeStatus).set('token', authResponse.token).send(authResponse);
  }

  static err400Res(res, err400Message) {
    return HttpResponse.response(res, 400, 'error', err400Message);
  }

  static err404Res(res, err404Message) {
    return HttpResponse.response(res, 404, 'error', err404Message);
  }

  /*
  static err403Res(res, err403Message) {
    return HttpResponse.response(res, 403, 'error', err403Message);
  }
  */

  static success200Res(res, success200Data) {
    return HttpResponse.response(res, 200, 'data', success200Data);
  }

  static success200ResMessage(res, success200Message) {
    return HttpResponse.response(res, 200, 'message', success200Message);
  }

  static success201ResMessage(res, success201Message) {
    return HttpResponse.response(res, 201, 'message', success201Message);
  }

  static success201Res(res, success201Data) {
    return HttpResponse.response(res, 201, 'data', success201Data);
  }

  static auth201Res(res, auth201Data, token) {
    return HttpResponse.authResponse(res, 201, 'data', auth201Data, token);
  }

  static auth200Res(res, auth201Data, token) {
    return HttpResponse.authResponse(res, 200, 'data', auth201Data, token);
  }
}
