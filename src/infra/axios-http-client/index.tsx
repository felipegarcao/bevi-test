
import axios, { AxiosResponse } from 'axios'
import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols/http/http-client'

export class AxiosHttpClient implements HttpClient {
  constructor(
    private readonly baseURL: string
  ){}

  async request (data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: this.baseURL + data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
        responseType: data.responseType
      })
    } catch (error) {
      if(error.message == "Network Error"){
        return {
          statusCode: HttpStatusCode.requestTimeout    
        }
      }
      axiosResponse = error.response
    }
    if(axiosResponse.status == HttpStatusCode.badRequest){
      return {
        statusCode: axiosResponse.status,
        error: axiosResponse.data,
        headers: axiosResponse.headers
      }
    }



    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
      headers: axiosResponse.headers
    }
  }
}