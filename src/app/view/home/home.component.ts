import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "../../service/order-service/order.service";
import {Order} from "../../model/order";
import {AuthenticationService} from "../../service/authentication-service/authentication.service";
import {User} from "../../model/user";
import {OrderTable} from "../../model/order-table";
import {MatDialog} from "@angular/material/dialog";
import {NewOrderComponent} from "../../component/new-order/new-order.component";

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
  currentOrders: OrderTable[] = [];
  pastOrders: OrderTable[] = [];
  displayedColumns: string[] = ['orderId', 'component', 'type', 'quantity', 'cost', 'dateOfDelivery'];
  loadingOrders: boolean = true;

  constructor(
    private authenticationService: AuthenticationService,
    private orderService: OrderService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    const user: User = this.authenticationService.user;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.getOrders();
  }

  get fullName(): string {
    return this.firstName[0].toUpperCase() + this.firstName.substring(1) +
      " " +
      this.lastName[0].toUpperCase() + this.lastName.substring(1);
  }

  getOrders() {
    this.loadingOrders = true;
    this.orderService.getOrders().subscribe(value => {
        console.log(value);
        this.currentOrders = value
          .filter(i => i.processResponse.dateOfDelivery >= new Date())
          .map(this.orderToOrderTable);
        this.currentOrders = value
          .filter(i => i.processResponse.dateOfDelivery < new Date())
          .map(this.orderToOrderTable);
      }, (e) => {
        this.authenticationService.logOut();
      },
      () => {
        this.loadingOrders = false;
      });
  }

  toggleSidenav() {
    this.sidenavVisible = !this.sidenavVisible;
  }

  logout() {
    this.authenticationService.logOut();
  }

  orderToOrderTable(order: Order): OrderTable {
    const componentType: string = order.processRequest.componentType;
    const type: string = componentType[0].toUpperCase() + componentType.substring(1);

    return {
      orderId: order.orderId,
      component: order.processRequest.componentName,
      type: type,
      quantity: order.processRequest.quantity,
      cost: order &&
      order.processResponse &&
      order.processResponse.processingCharge &&
      order.processResponse.packagingAndDeliveryCharge
        ? order.processResponse.processingCharge
        + order.processResponse.packagingAndDeliveryCharge
        : 0,
      dateOfDelivery: order.processResponse.dateOfDelivery
    };
  }

  newOrder() {
    const dialogRef = this.dialog.open(NewOrderComponent, {
      disableClose: false,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.orderService
      }
    })
  }
}
