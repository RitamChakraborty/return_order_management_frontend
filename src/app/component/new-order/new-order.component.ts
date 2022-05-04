import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ComponentType} from "../../model/component-type";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit {
  valid: boolean = false;
  newOrderForm?: FormGroup;
  componentTypes: ComponentType[] = [{
    value: 'integral-item',
    viewValue: 'Integral Item'
  }, {
    value: 'accessory',
    viewValue: 'Accessory'
  }];

  constructor(
    public dialogRef: MatDialogRef<NewOrderComponent>,
    private formBuilder: FormBuilder
  ) {
    this.newOrderForm = formBuilder.group({
      name: ['', Validators.required],
      contactNumber: ['', Validators.pattern(/^\d{10}$/g)],
      componentName: ['', Validators.required],
      componentType: ['integral-item', Validators.required],
      quantity: [1, [Validators.min(1), Validators.max(100)]]
    });
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

  get name() {
    return this.newOrderForm?.get('name');
  }

  get contactNumber() {
    return this.newOrderForm?.get('contactNumber');
  }

  get componentName() {
    return this.newOrderForm?.get('componentName');
  }

  get componentType() {
    return this.newOrderForm?.get('componentType');
  }

  get quantity() {
    return this.newOrderForm?.get('quantity');
  }
}
