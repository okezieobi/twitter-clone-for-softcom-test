class Protocol {
  responseData(codeStatus, resKey, resValue) {
    this.resData = {
      status: codeStatus,
      [resKey]: resValue,
    };
    return this.resData;
  }

  response(res, codeStatus, resKey, resValue) {
    const response = this.responseData(codeStatus, resKey, resValue);
    res.status(codeStatus).send(response);
  }

  authResponse(res, codeStatus, resKey, resValue, token) {
    const authResponse = this.responseData(codeStatus, resKey, resValue);
    authResponse.token = token;
    res.status(codeStatus).set('token', authResponse.token).send(authResponse);
  }

  err400Res(res, err400Message) {
    return this.response(res, 400, 'error', err400Message);
  }

  err404Res(res, err404Message) {
    return this.response(res, 404, 'error', err404Message);
  }

  err403Res(res, err403Message) {
    return this.response(res, 403, 'error', err403Message);
  }

  success200Res(res, success200Data) {
    return this.response(res, 200, 'data', success200Data);
  }

  success200ResMessage(res, success200Message) {
    return this.response(res, 200, 'message', success200Message);
  }

  success201Res(res, success201Data) {
    return this.response(res, 201, 'data', success201Data);
  }

  auth201Res(res, auth201Data, token) {
    return this.authResponse(res, 201, 'data', auth201Data, token);
  }

  auth200Res(res, auth201Data, token) {
    return this.authResponse(res, 200, 'data', auth201Data, token);
  }
}

export default new Protocol();
