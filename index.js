const axios = require('axios');

const apiKey = process.env.FTX_API_KEY;
const apiSecret = process.env.FTX_API_SECRET;

const FTXUS_KEY = 'FTXUS-KEY';
const FTXUS_TS = 'FTXUS-TS';
const FTXUS_SIGN = 'FTXUS-SIGN';
const FTXUS_SUBACCOUNT = 'FTXUS-SUBACCOUNT';

const defaultURL = 'ftx.us/api';

class FTXUS {
  constructor({
    key,
    secret
  }) {
    this._key = key;
    this._secret = secret;
    this._client = axios;
    this._subaccount = null;
  };

  signRequest() {
    const headers = this._client.default.headers.common;
    const timestamp = headers[FTXUS_TS];


  }

  createRequest(method, endpoint) {
    if (this._subaccount) {
      this.client.default.headers.common[FTXUS_SUBACCOUNT] = this._subaccount;
    }
    this._client.default.headers.common[FTXUS_KEY] = this._key;
    this._client.default.headers.common[FTXUS_TS] = Date.now();

  }
}
