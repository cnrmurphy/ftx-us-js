const axios = require('axios');
const crypto = require('crypto');
const { URL } = require('url');

const WalletService = require('./Wallet');
const MarketsService = require('./Markets');
const OrdersService = require('./Orders');

const FTXUS_KEY = 'FTXUS-KEY';
const FTXUS_TS = 'FTXUS-TS';
const FTXUS_SIGN = 'FTXUS-SIGN';
const FTXUS_SUBACCOUNT = 'FTXUS-SUBACCOUNT';

const defaultURL = 'https://ftx.us/api';
const defaultTimeout = 1000;

class FTXUS {
  constructor({
    key='',
    secret='',
    client=null,
  }) {
    this._key = key;
    this._secret = secret;
    this._baseURL = new URL(defaultURL);
    this._client = client || axios.create({
      baseURL: defaultURL,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: defaultTimeout
    });
    this._subaccount = null;
    this._wallet = new WalletService(this);
    this._markets = new MarketsService(this);
    this._orders = new OrdersService(this);
  };

  get Wallet(){
    return this._wallet;
  }

  get Markets(){
    return this._markets;
  }

  get Orders() {
    return this._orders;
  }

  get baseURL() {
    return this._baseURL;
  }

  set client(client){
    this._client = client;
  }

  requestSignature(ts, method, url) {
    const signaturePayload = `${ts}${method}/api${url.pathname}${url.search}`;
    const signature = crypto.createHmac('sha256', this._secret)
      .update(signaturePayload)
      .digest('hex');
    return signature;
  }

  createRequest(method, url) {
    if (this._subaccount) {
      this.client.defaults.headers.common[FTXUS_SUBACCOUNT] = this._subaccount;
    }
    if (this.clientCanAuthorize()) {
      const ts = +Date.toString();
      this._client.defaults.headers.common[FTXUS_KEY] = this._key;
      this._client.defaults.headers.common[FTXUS_TS] = ts;
      this._client.defaults.headers.common[FTXUS_SIGN] = this.requestSignature(ts, method, url);
    }
  }

  clientCanAuthorize() {
    if (this._key.length > 0 && this._secret.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  get(url) {
    this.createRequest('GET', url);
    return this._client.get(url.pathname+url.search);
  }

  post(url, payload) {
    this.createRequest('POST', url);
    return this._client.post(url.pathname, payload);
  }
}

module.exports = FTXUS;
