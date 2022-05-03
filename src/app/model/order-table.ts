export interface OrderTable {
  orderId: number;
  component: string;
  type: string;
  quantity: number,
  cost: number;
  dateOfDelivery: Date;
}
