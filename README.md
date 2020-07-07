# FTX US JavaScript Client

An API Client for FTX.us. 

## Motivation
I haven't seen many Node.js implementations of the FTX API client
and wanted to build one that worked specifically with FTX.us.
I haven't looked into it yet, but I assume that both FTX APIs
are equivalent so you should be able to switch the client URL
and HTTP headers to the regular FTX values and it will work the same.
At some pont there will be an option to simply point this client at either
address.

## Installation
```
npm i ftx-us
```

## Example Usage
```JavaScript
const { FTXUS } = require('ftx-us');

// Retrieve secrets if authenticating
const apiKey = process.env.FTX_API_KEY;
const apiSecret = process.env.FTX_API_SECRET;

const ftxUS = new FTXUS({ key: apiKey, secret: apiSecret });

(async () => {
  // Get all markets
  const markets = await ftxUS.Markets.list();
  console.log(markets);
})();
```

## Methods
### Wallet
[FTX.us Documentation](https://docs.ftx.us/#wallet)
#### getCoins()
```JavaScript
await FTXUS.Wallet.getCoins();
```
#### getBalances()
```JavaScript
await FTXUS.Wallet.getBalances();
```
#### getDepositAddress()
```JavaScript
await FTXUS.Wallet.getDepositAddress();
```
#### getDepositHistory()
```JavaScript
await FTXUS.Wallet.getDepositHistory();
```
#### getWithdrawlHistory()
```JavaScript
await FTXUS.Wallet.getWithdrawalHistory();
```
#### requestWithdrawl()
```JavaScript
await FTXUS.Wallet.requestWithdrawal();
```
### Markets
[FTX.us Documentation](https://docs.ftx.us/#markets)
#### list() (Get markets)
```JavaScript
await FTXUS.Markets.list();
```
#### get() (Get single market)
```JavaScript
// Get market data for a given coin
const { currencyPairs } = require('ftx-us');
const marketName = currencyPairs.BTC.USD; // 'BTC/USD'
await FTXUS.Markets.get(marketName);
```
#### getOrderBook()
```JavaScript
const { currencyPairs } = require('ftx-us');
const marketName = currencyPairs.ETH.USDT; // 'ETH/USDT'
await FTXUS.Markets.getOrderBook(marketName);
```
#### getTrades()
```JavaScript
const { currencyPairs } = require('ftx-us');
const marketName = currencyPairs.BTC.USD; // 'BTC/USD'
const optionalParameters = {
  startTime: '1559881511',
  endTime: '1559881711',
  limit: 50
};
await FTXUS.Markets.getTrades(marketName, optionalParameters);
```
### Orders
[FTX.us Documentation](https://docs.ftx.us/#orders)
### getOpenOrders()
```JavaScript
await FTXUS.Orders.getOpenOrders();
```
### getHistory()
```JavaScript
const { currencyPairs } = require('ftx-us');
const marketName = currencyPairs.BTC.USD;
const opts = { startTime: 1559881511, endTime: 1559901511, limit: 100 }
await FTXUS.Orders.getHistory(marketName, opts);
```
### canelAllOrders()
```JavaScript
await FTXUS.Orders.cancelAllOrders();
```

## TODO
Currently the client uses Axios.js to make HTTP requests.
I will be replacing this with the native Node.js HTTP client