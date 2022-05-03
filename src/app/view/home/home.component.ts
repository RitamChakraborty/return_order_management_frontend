import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "../../service/order-service/order.service";
import {Order} from "../../model/order";
import {AuthenticationService} from "../../service/authentication-service/authentication.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() sidenavVisible: boolean = false;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  currentOrders: Order[] = [];
  pastOrders: Order[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private orderService: OrderService
  ) {
  }

  get fullName(): string {
    return this.firstName[0].toUpperCase() + this.firstName.substring(1) +
      " " +
      this.lastName[0].toUpperCase() + this.lastName.substring(1);
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

  ngOnInit(): void {
    const user: User = this.authenticationService.user;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.getOrders();
  }

  get userAccountFavLetter(): string {
    return this.firstName[0];
  }

  toggleSidenav() {
    this.sidenavVisible = !this.sidenavVisible;
  }

  logout() {
    this.authenticationService.logOut();
  }

  newOrder() {

  }
}
