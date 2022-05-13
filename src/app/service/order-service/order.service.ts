import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Order} from "../../model/order";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {AuthenticationService} from "../authentication-service/authentication.service";
import {LocalStorageService} from "../local-storage-service/local-storage.service";
import {ProcessResponse} from "../../model/process-response";
import {NewOrderResponse} from "../../model/new-order-response";
import {OrderRequest} from "../../model/order-request";
import {ProcessRequest} from "../../model/process-request";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService
  ) {
  }

  getOrders(): Observable<Order[]> {
    const jwtToken: string = this.localStorageService.jwtToken!;
    const httpHeader: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    });
    return this.httpClient.get<Order[]>(
      environment.apiUrl + `/component-processing/api/order-details`,
      {
        headers: httpHeader
      }
    );
  }

  processOrder(processRequest: ProcessRequest): Observable<ProcessResponse> {
    const jwtToken: string = this.localStorageService.jwtToken!;
    const httpHeader: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    });
    return this.httpClient.post<ProcessResponse>(
      environment.apiUrl + `/component-processing/api/process-detail`,
      processRequest,
      {
        headers: httpHeader
      }
    );
  }

  placeOrder(orderRequest: OrderRequest): Observable<ProcessResponse> {
    const jwtToken: string = this.localStorageService.jwtToken!;
    const httpHeader: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    });
    return this.httpClient.post<ProcessResponse>(
      environment.apiUrl + `/component-processing/api/place-order`,
      orderRequest,
      {
        headers: httpHeader
      }
    );
  }

  processPayment(newOrderResponse: NewOrderResponse): Observable<string> {
    const jwtToken: string = this.localStorageService.jwtToken!;
    const httpHeader: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    });
    const paymentProcessingApiUrl = `${environment.apiUrl}/component-processing/api/complete-processing` +
      `?requestId=${encodeURIComponent(newOrderResponse.requestId)}` +
      `&creditCardNumber=${newOrderResponse.creditCardNumber}` +
      `&creditLimit=${newOrderResponse.creditCardLimit}` +
      `&processingCharge=${newOrderResponse.processingCharge}`;
    return this.httpClient.get<string>(
      paymentProcessingApiUrl,
      {
        headers: httpHeader
      }
    );
  }
}
