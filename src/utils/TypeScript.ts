import rootReducer from "../redux/reducer";

export type RootStore = ReturnType<typeof rootReducer>;

export interface IParams {
  page: string;
  slug: string;
}

export interface IExchanges {
  id: string
  rank: string
  changePercent24Hr: string
  explorer: string
  marketCapUsd: string
  maxSupply: string
  name: string
  priceUsd: string
  supply: string
  symbol: string
  volumeUsd24Hr: string
  vwap24Hr: string
}

export interface IAssets {
  asset_id: string
  name: string
  type_is_crypto: number
  data_quote_start: string
  data_quote_end: string
  data_orderbook_start: string
  data_orderbook_end: string
  data_trade_start: string
  data_trade_end: string
  data_symbols_count: number
  volume_1hrs_usd: number
  volume_1day_usd: number
  volume_1mth_usd: number
  price_usd: number
  id_icon: string
  data_start: string
  data_end: string
}