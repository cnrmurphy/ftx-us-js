const basePath = '/fills';

class FillsService {
  constructor(client) {
    this._client = client;
  }

  async list(opts={
    market: null,
    limit: null,
    startTime: null,
    endTime: null
  }) {
    const c = this._client;
    const u = c.newBaseURL();
    u.pathname = basePath;

    if (opts.market) {
      u.searchParams.append('market', opts.market);
    }

    if (opts.limit) {
      u.searchParams.append('limit', opts.limit)
    }

    if (opts.startTime) {
      u.searchParams.append('startTime', opts.startTime);
    }

    if (opts.endTime) {
      u.searchParams.append('endTime', opts.endTime);
    }

    const r = await c.get(u);
    return r.data.result;
  }
}

module.exports = FillsService;
