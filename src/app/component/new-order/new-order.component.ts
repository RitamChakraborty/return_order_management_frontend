import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ComponentType} from "../../model/component-type";
import {StepperOrientation} from "@angular/cdk/stepper";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit {
  newOrderForm?: FormGroup;
  paymentForm?: FormGroup;
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
    this.paymentForm = formBuilder.group({
      creditCardNumber: ['', Validators.pattern(/^\d{16}$/)]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.dialogRef.close(this.newOrderForm);
  }

  onCancel() {
    this.dialogRef.close();
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

  get creditCardNumber() {
    return this.paymentForm?.get('creditCardNumber');
  }

  getOrientation(): StepperOrientation {
    if (window.innerHeight > window.innerWidth) {
      return "vertical";
    }

    return "horizontal";
  }
}
