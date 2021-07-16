import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  private baseUrl: string = "https://resortsapp2021.herokuapp.com/api/";


  constructor(public httpClient: HttpClient) {}

  /** @description  Executes a get request and returns the response.
   * @param endpointUrl string The endpoint Url.
   * @return Observable<any> The response.
   */
  public get(endpointUrl: string): Observable < any > {
    let httpHeaders = new HttpHeaders();
    return this.httpClient.get < any > (this.baseUrl + endpointUrl, {
      headers: httpHeaders
    });
  }

  public getWithBody(endpointUrl: string, query :string ,query1?:string,query2?:string): Observable < any > {
    let httpHeaders = new HttpHeaders();
    return this.httpClient.get < any > (this.baseUrl + endpointUrl,{
      headers: httpHeaders,
      params: {day:query,from:query1 ,to:query2},
    })
    // (this.baseUrl + endpointUrl, {
    //   headers: httpHeaders
    // });
  }
  /** @description Executes a post request and returns the response.
   * @param endpointUrl string The endpoint Utl.
   * @param request any The request payload.
   * @returns observable<any> The response.
   */
  public post(endpointUrl: string, request: any): Observable < any > {
    let httpHeaders = new HttpHeaders();
    return this.httpClient.post < any > (this.baseUrl + endpointUrl, request, {
      headers: httpHeaders
    });
  }

  // public postWithHeader(endpointUrl: string, request: any, headerPara): Observable < any > {
  //   let httpHeaders = new HttpHeaders();
  //   httpHeaders.set('Authorization', 'Bearer ' + headerPara);
  //   return this.httpClient.post < any > (this.baseUrl + endpointUrl, request, {
  //     headers: {'Authorization': 'Bearer ' + headerPara}
  //   });
  // }
  /** @description Executes a put request and returns the response.
   * @param endpointUrl string The endpoint Url.
   * @param request any The request payload.
   * @returns observable<any> The response.
   */
  public put(endpointUrl: string, request: any): Observable < any > {
    let httpHeaders = new HttpHeaders();
    return this.httpClient.put < any > (this.baseUrl + endpointUrl, request, {
      headers: httpHeaders
    });
  }

  /**@description Executes a delete request and returns the response.
   * @param endpointUrl string The endpoint Url.
   * @returns observable<any> The response.
   */
  public delete(endpointUrl: string): Observable < any > {
    let httpHeaders = new HttpHeaders();
    return this.httpClient.delete < any > (this.baseUrl + endpointUrl, {
      headers: httpHeaders
    });
  }
}