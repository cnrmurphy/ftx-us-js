const FTXUS = require('./FTXUS');
const endpoints = require('./endpoints');
const apiKey = process.env.FTX_API_KEY;
const apiSecret = process.env.FTX_API_SECRET;

(async () => {
  try {
    let ftxUs = new FTXUS({ key: apiKey, secret: apiSecret });
    
    ftxUs.createRequest('get', endpoints.WALLET.ALL_BALANCES);
    console.log(await ftxUs._client.get(endpoints.WALLET.ALL_BALANCES));

  } catch(e) {
    console.log(e);
  }
})();
