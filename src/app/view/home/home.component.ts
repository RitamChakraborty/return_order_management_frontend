import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../service/order-service/order.service";
import {Order} from "../../model/order";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  firstName: String = "Ritam";
  currentOrders: Order[] = [];
  pastOrders: Order[] = [];

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe(value => {
      console.log(value);
      this.currentOrders = value.filter(i => i.processResponse.dateOfDelivery >= new Date());
      this.currentOrders = value.filter(i => i.processResponse.dateOfDelivery < new Date());
    });
  }

  getTotalCost(order: Order): number {
    if (order &&
      order.processResponse &&
      order.processResponse.processingCharge &&
      order.processResponse.packagingAndDeliveryCharge) {
      return order.processResponse.processingCharge + order.processResponse.packagingAndDeliveryCharge;
    }

    return 0;
  }
}
