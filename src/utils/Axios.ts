import { IAssets, IAssetsIcon } from './TypeScript';
import axios from 'axios'
// const url = 'https://rest.coinapi.io/v1';




// export const getAPI = async (token: string) => {
//   const res = await axios.get(`${url}`, {
//     headers: { 'X-CoinAPI-Key': '994188B4-B06F-4AFC-9379-9292654EA646' }
//   })
//   return res
// }


export class CoinApiService {

  public static readonly BASE_URL = 'https://rest.coinapi.io/v1';

  constructor(private apiKey: string) {

  }


  async getAssets() {
    const response = await this.getAPI('/assets');
    return response as IAssets[]
  }

  async getAssetsIcon() {
    const response = await this.getAPI('/assets/icons/32');
    return response as IAssetsIcon[];
  }



  async getAPI(endpoint: string) {
    const res = await axios.get(`${CoinApiService.BASE_URL}${endpoint}`, {
      headers: { 'X-CoinAPI-Key': this.apiKey }
    })
    return res.data
  }


}
const coinInstance = new CoinApiService('994188B4-B06F-4AFC-9379-9292654EA646');

export default coinInstance;
