const { FTXUS, currencyPairs } = require('./index');

const apiKey = process.env.FTX_API_KEY;
const apiSecret = process.env.FTX_API_SECRET;
const ftxUS = new FTXUS({ key: apiKey, secret: apiSecret });

(async () => {
  try { 
    const fills = ftxUS.Fills;
    console.log(await fills.list({ limit: 10, market: currencyPairs.BTC.USD }));
  } catch(e) {
    console.log(e);
  }
})();
