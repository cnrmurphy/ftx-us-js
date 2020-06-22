const axios = require('axios');
const crypto = require('crypto');
const { URL } = require('url');

const FTXUS_KEY = 'FTXUS-KEY';
const FTXUS_TS = 'FTXUS-TS';
const FTXUS_SIGN = 'FTXUS-SIGN';
const FTXUS_SUBACCOUNT = 'FTXUS-SUBACCOUNT';

const defaultURL = 'https://ftx.us/api';
const defaultTimeout = 1000;

class FTXUS {
  constructor({
    key,
    secret,
    client=null
  }) {
    this._key = key;
    this._secret = secret;
    this._client = client || axios.create({
      baseURL: defaultURL,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: defaultTimeout
    });
    this._subaccount = null;
  };

  signRequest() {
    const headers = this._client.defaults.headers.common;
    const timestamp = headers[FTXUS_TS];
    const url = new URL(this._client.defaults.baseURL);
    const signaturePayload = `${timestamp}${this._client.method}${url.pathname}`;
    const signature = crypto.createHmac('sha256', this._secret)
      .update(signaturePayload)
      .digest('hex');
    
    headers[FTXUS_SIGN] = signature;
  }

  createRequest(method, endpoint) {
    if (this._subaccount) {
      this.client.defaults.headers.common[FTXUS_SUBACCOUNT] = this._subaccount;
    }
    this._client.defaults.headers.common[FTXUS_KEY] = this._key;
    this._client.defaults.headers.common[FTXUS_TS] = Date.now();
    this.signRequest();
  }
}

module.exports = FTXUS;
