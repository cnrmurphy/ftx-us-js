module.exports = {
  SUBACCOUNTS: {
    DEFAULT: '/subaccounts',
    UPDATE_NAME: '/subaccounts/update_name',
    TRANSFER: '/subaccounts/transfer'
  },
  MARKETS: {
    DEFAULT: '/markets',
    ORDERBOOK: '/orderbook?depth='            // /markets/{market_name}/orderbook?depth={depth}
  },
  WALLET: {
    DEFAULT: '/wallet',
    COINS: '/wallet/coins',
    BALANCES: '/wallet/balances',
    DEPOSIT_ADDRESS: '/wallet/deposit_address',
    ALL_BALANCES: '/wallet/all_balances',
    DEPOSITS: '/wallet/deposits',
    WITHDRAWALS: '/wallet/withdrawals'
  },
}
