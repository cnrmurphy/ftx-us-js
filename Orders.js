const { URL } = require('url');

const basePath = '/orders';

const orderTypes = {
  STOP: 'stop',
  TRAILING_STOP: 'trailing_stop',
  TAKE_PROFIT: 'take_profit'
}

class OrdersService {
  constructor(client) {
    this._client = client;
  }

  async getOpenOrders(market) {
    const c = c.newBaseURL();
    u.pathname = basePath;

    if (market) {
      u.searchParams.append('market', market);
    }

    const r = await c.get(endpoint);
    return r.data.result;
  }

  async getHistory(market=null, opts={ startTime: null, endTime: null, limit: 100 }) {
    const { startTime, endTime, limit } = opts;
    const c = this._client;
    const u = c.newBaseURL();
    u.pathname = basePath + '/history';
    u.searchParams.append('limit', limit);

    if (market) {
      u.searchParams.append('market', market);
    }

    if (startTime) {
      u.searchParams.append('start_time', startTime);
    }

    if (endTime) {
      u.searchParams.append('end_time', endtime);
    }

    const r = await c.get(u);
    return r.data.result;
  }

  async getOpenTriggerOrders(opts={ market: null, type: null }) {
    const c = this._client;
    const u = c.newBaseURL();
    u.pathname = '/conditional_orders';

    if (market) {
      u.searchParams.append('market', market);
    }

    if (type) {
      u.searchParams.append('type', type);
    }
  
   const r = await c.get(u);

   return r.data.result;
  }

  async getTriggerOrderTriggers(orderId) {
    const c = this._client;
    const u = c.newBaseURL();
    u.pathname = `/conditional_orders/${orderId}/triggers`;

    const r = await c.get(u);

    return r.data.result;
  }

  async getTriggerOrderHistory(opts={
    market: null,
    startTime: null,
    endTime: null,
    side: null,
    type: null,
    orderType: null,
    limit: null
  }) {
    const c = this._client;
    const u = c.newBaseURL();
    u.pathname = '/conditional_orders/history';

    // Loop through the provided optional parameters
    // and add the key/value pairs to the URL as search params
    Object.keys(opts).forEach(key => {
      if (opts[key]) {
        u.searchParams.append(key, opts[key]);
      }
    });
    
    const r = await c.get(u);

    return r.data.result;
  }

  async placeOrder(market, side, price, type, size, opts= {
    reduceOnly: false,
    ioc: false,
    postOnly: false,
    clientId: null
  }) {
    const c = this._client;
    const u = c.newBaseURL();
    u.pathname = '/orders';

    const payload = { market, side, price, type, size, ...opts };
    const r = await c.post(u, payload);

    return r.data.result;
  }

  async placeTriggerOrder(market, side, size, type, opts={
    reduceOnly: false,
    retryUntilFilled: false,
    stopLoss: {
      triggerPrice: 0,
      orderPrice: 0
    },
    trailingStop: {
      trailValue: 0
    },
    takeProfit: {
      triggerPrice: 0,
      orderPrice: 0
    }
  }) {
    const c = this._client;
    const u = c.newBaseURL();
    u.pathname = '/conditional_orders';

    const { reduceOnly, retryUntilFilled, stopLoss, trailingStop, takeProfit } = opts;
    const payload = { market, side, size, type, reduceOnly, retryUntilFilled };

    if (stopLoss.triggerPrice !== 0) {
      payload['stopLoss'] = stopLoss;
    }

    if (trailingStop.trailValue !== 0) {
      payload['trailingStop'] = trailingStop;
    }

    if (takeProfit.triggerPrice !== 0) {
      payload['takeProfit'] = takeProfit;
    }

    const r = await c.post(u, payload);

    return r.data.result;
  }

  async modifyOrder(opts={ orderId: null, price: null, size: null, clientId: null }) {
    // Ensure that the minimal required parameters are provided to the method
    if (opts.orderId && opts.clientId) {
      return new Error(`Both an Order ID and Client ID was passed. Provide only one of he two parameters depending on how you wish to modify your order.`);
    }
    if (!opts.orderId && !opts.clientId) {
      return new Error(`You must provide either an Order ID or Client ID to modify your order.`);
    }
    if (!opts.price && !opts.size) {
      return new Error(`Tried to modify Order ${opts.orderId} without providing a price or size`);
    }
    
    const c = this._client;
    const u = c.newBaseURL();

    if (opts.orderId) {
      u.pathname = `/orders/${opts.orderId}/modify`;
    }

    if (opts.clientId) {
      u.pathname = `/orders/by_client_id/${opts.clientId}/modify`;
    }
    
    const payload = {};

    if (opts.price) {
      payload.price = opts.price;
    }
    if (opts.size) {
      payload.size = opts.size;
    }
    if (opts.cliendId) {
      payload.clientId = opts.clientId;
    }

    const r = c.post(u, payload);

    return r.data.result;
  }

  async getOrderStatus(id) {
    const c = this._client;
    const u = c.newBaseURL();
    u.pathname = `/orders/${id}`;

    const r = await c.get(u);

    return r.data.result;
  }

  async getOrderStatusByClientId(id) {
    const c = this._client;
    const u = c.newBaseURL();
    u.pathname = `/orders/by_client_id/${client_order_id}`;

    const r = await c.get(u);

    return r.data.result;
  }

  async cancelById(id) {
    const c = this._client;
    const u = c.newBaseURL();
    u.pathname = `/orders/${id}`;

    const r = await c.delete(u);

    return r.data.result;
  }

  async cancelByClientId(id) {
    const c = this._client;
    const u = c.newBaseURL();
    u.pathname = `/orders/by_client_id/${id}`;

    const r = await c.delete(u);

    return r.data.result;
  }

  async cancelOpenTriggerOrders(id) {
    const c = this._client;
    const u = c.newBaseURL();
    u.pathname = `/conditional_orders/${id}`;

    const r = await c.delete(u);

    return r.data.result;
  }

  async cancelAllOrders() {
    const c = this._client;
    const u = c.newBaseURL();
    u.pathname = `/orders}`;

    const r = await c.delete(u);

    return r.data.result;
  }
}

module.exports = OrdersService;
