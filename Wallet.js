const { URL } = require('url');

const endpoints = require('./endpoints');

class WalletService {
  constructor(client) {
    this._client = client;
  }

  async getCoins() {
    const c = this._client;
    const u = new URL(c.baseURL.href);
    u.pathname = endpoints.WALLET.COINS;

    const r = await c.get(u);
    return r.data.result;
  }

  async getBalances() {
    const c = this._client;
    const u = new URL(c.baseURL.href);
    u.pathname = endpoints.WALLET.BALANCES;
    
    const r = await c.get(u);
    return r.data.result;
  }

  async getDepositAddress(coinId) {
    const c = this._client;
    const u = new URL(c.baseURL.href);
    u.pathname = endpoints.WALLET.DEPOSIT_ADDRESS + `/${coinId}`;
    
    const r = await c.get(u);
    return r.data.result;
  }

  async getDepositHistory() {
    const c = this._client;
    const u = new URL(c.baseURL.href);
    u.pathname = endpoints.WALLET.DEPOSITS;

    const r = await c.get(u);
    return r.data.result;
  }

  async getWithdrawlHistory() {
    const c = this._client;
    const u = new URL(c.baseURL.href);
    u.pathname = endpoints.WALLET.WITHDRAWALS;

    const r = await c.get(u);
    return r.data.result;
  }

  async requestWithdrawl(coin, size, address, opts={ tag: null, password: null, code: null }) {
    const { tag, password, code } = opts;
    const c = this._client;
    const u = new URL(c.baseURL.href);
    u.pathname = endpoints.WALLET.WITHDRAWALS;

    const r = await c.post(u, {
      coin,
      size,
      address,
      tag,
      password,
      code
    });

    return r.data.result;
  }
}

module.exports = WalletService;
