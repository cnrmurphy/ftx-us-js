const FTXUS = require('./FTXUS');

const apiKey = process.env.FTX_API_KEY;
const apiSecret = process.env.FTX_API_SECRET;

const ftxUs = new FTXUS({ key: apiKey, secret: apiSecret });

(async () => {
  try { 
    const m = ftxUs.Markets;
    console.log(await m.list());
  } catch(e) {
    console.log(e);
  }
})();
