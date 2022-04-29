import {ProcessRequest} from "./process-request";
import {ProcessResponse} from "./process-response";

export interface Order {
  orderId: number;
  customerEmail: string;
  processRequest: ProcessRequest;
  processResponse: ProcessResponse;
}
