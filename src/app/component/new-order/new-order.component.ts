import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  valid: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<NewOrderComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.valid = true;
    this.dialogRef.close(this.valid);
  }

  onCancel() {
    this.dialogRef.close(this.valid);
  }
}
