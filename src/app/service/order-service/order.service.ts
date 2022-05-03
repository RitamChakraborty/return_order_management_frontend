import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../../model/order";
import {delay, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(http: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    let orders: Array<Order> = [
      {
        orderId: 123,
        customerEmail: 'ritam@gmail.com',
        processRequest: {
          name: 'Ritam Chakraborty',
          contactNumber: '9876543210',
          componentName: 'Camera Module',
          componentType: 'accessory',
          quantity: 1
        },
        processResponse: {
          requestId: 'H11HF11',
          processingCharge: 300,
          packagingAndDeliveryCharge: 200,
          dateOfDelivery: new Date(),
        }
      }
    ];

    return of(orders).pipe(delay(2000));
  }
}
