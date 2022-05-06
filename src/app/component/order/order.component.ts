import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Order} from "../../model/order";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<OrderComponent>,
    @Inject(MAT_DIALOG_DATA) public order: Order
  ) {
  }

  ngOnInit(): void {
    console.log(this.order);
  }
}
