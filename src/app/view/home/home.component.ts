import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "../../service/order-service/order.service";
import {Order} from "../../model/order";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() sidenavVisible: boolean = false;
  firstName: string = "Ritam";
  lastName: string = "Chakraborty";
  email: string = "ritam@gmail.com";
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

  get fullName(): string {
    return this.firstName + " " + this.lastName;
  }

  get userAccountFavLetter(): string {
    return this.firstName[0];
  }

  toggleSidenav() {
    this.sidenavVisible = !this.sidenavVisible;
  }

  logout() {

  }

  newOrder() {

  }
}
