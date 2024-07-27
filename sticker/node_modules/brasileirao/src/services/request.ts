import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { randomUserAgent } from '../utils'

class Request {
 
  async get<T>(url:string): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        method: 'GET',
        url: url,
        headers: {
          'User-Agent': randomUserAgent(),
        },
      };
      const response: AxiosResponse<T> = await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new Request();






