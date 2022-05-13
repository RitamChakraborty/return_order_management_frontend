import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ComponentType} from "../../model/component-type";
import {StepperOrientation} from "@angular/cdk/stepper";
import {OrderService} from "../../service/order-service/order.service";
import {ProcessRequest} from "../../model/process-request";
import {ProcessResponse} from "../../model/process-response";
import {NewOrderResponse} from "../../model/new-order-response";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit {
  newOrderForm?: FormGroup;
  paymentForm?: FormGroup;
  processingOrder?: boolean = false;
  processingOrderFailed: boolean = false;
  processResponse?: ProcessResponse;
  componentTypes: ComponentType[] = [{
    value: 'integral-item',
    viewValue: 'Integral Item'
  }, {
    value: 'accessory',
    viewValue: 'Accessory'
  }];

  constructor(
    public dialogRef: MatDialogRef<NewOrderComponent>,
    private formBuilder: FormBuilder,
    private orderService: OrderService
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

  get processRequest(): ProcessRequest {
    return {
      name: this.newOrderForm?.value.name,
      contactNumber: this.newOrderForm?.value.contactNumber,
      componentName: this.newOrderForm?.value.componentName,
      componentType: this.newOrderForm?.value.componentType,
      quantity: this.newOrderForm?.value.quantity
    };
  }

  processOrder() {
    this.processingOrder = true;
    const processRequest: ProcessRequest = this.processRequest;
    this.orderService
      .processOrder(processRequest)
      .subscribe((value) => {
          this.processResponse = value;
        }, (e) => {
          this.processingOrder = false;
          this.processingOrderFailed = true;
        }, () => {
          this.processingOrder = false;
          this.processingOrderFailed = false;
        }
      );
  }

  placeOrder() {
    const totalCost: number = this.processResponse?.processingCharge! +
      this.processResponse?.packagingAndDeliveryCharge!;
    const newOrderResponse: NewOrderResponse = {
      requestId: this.processResponse?.requestId!,
      creditCardNumber: this.paymentForm?.value.creditCardNumber,
      creditCardLimit: totalCost + 1,
      processingCharge: totalCost,
      processRequest: this.processRequest,
      processResponse: this.processResponse!
    }
    this.dialogRef.close(newOrderResponse);
  }
}
