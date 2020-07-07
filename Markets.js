const { URL } = require('url');

const basePath = '/markets';

class MarketsService {
  constructor(client) {
    this._client = client;
  }

  async list() {
    const c = this._client;
    const u = new URL(c.baseURL.href);
    u.pathname = basePath;

    const r = await c.get(u);
    return r.data.result;
  }

  async get(marketName) {
    const c = this._client;
    const u = new URL(c.baseURL.href);
    u.pathname = `${basePath}/${marketName}`;

    const r = await this._client.get(u);
    return r.data.result;
  }

  async getOrderBook(marketName, depth=20) {
    const c = this._client;
    const u = new URL(c.baseURL.href);
    u.pathname = `${basePath}/${marketName}/orderbook`;
    u.searchParams.append('depth', depth);

    const r = await c.get(u);
    return r.data.result;
  }

  async getTrades(marketName, opts={ startTime: null, endTime: null, limit: 20 }) {
    const { startTime, endTime, limit } = opts;
    const c = this._client;
    const u = new URL(c.baseURL.href);
    u.pathname = `${basePath}/${marketName}/trades`;
    u.searchParams.append('limit', limit);

    if (startTime) {
      u.searchParams.append('start_time', startTime);
    }

    if (endTime) {
      u.searchParams.append('end_time', endTime);
    }

    const r = await c.get(u);
    return r.data.result;
  }
}

module.exports = MarketsService;
