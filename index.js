const FTXUS = require('./FTXUS');
const endpoints = require('./endpoints');
const apiKey = process.env.FTX_API_KEY;
const apiSecret = process.env.FTX_API_SECRET;
const ftxUs = new FTXUS({ key: apiKey, secret: apiSecret });

(async () => {
  try {
    const wallet = await getWallet();
    const markets = await getMarkets();
    wallet.main.forEach(asset => {
      console.log(asset);
    });

    markets.forEach(market => {
      console.log(market);
    });

  } catch(e) {
    console.log(e);
  }
})();

async function getWallet() {
   ftxUs.createRequest('GET', endpoints.WALLET.ALL_BALANCES);
   const walletResp = await ftxUs._client.get(endpoints.WALLET.ALL_BALANCES);
   const wallet = walletResp.data.result;
   return wallet;
}

async function getMarkets() {
    ftxUs.createRequest('GET', '/markets');
    const resp = await ftxUs._client.get('/markets');
    const markets = resp.data.result;
    return markets;
}
