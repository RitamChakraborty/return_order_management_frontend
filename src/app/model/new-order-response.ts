import {ProcessResponse} from "./process-response";
import {ProcessRequest} from "./process-request";

export interface NewOrderResponse {
  requestId: string;
  creditCardNumber: string;
  creditCardLimit: number;
  processingCharge: number;
  processRequest: ProcessRequest;
  processResponse: ProcessResponse;
}
