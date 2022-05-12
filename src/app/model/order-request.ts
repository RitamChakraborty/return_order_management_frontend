import {ProcessRequest} from "./process-request";
import {ProcessResponse} from "./process-response";

export interface OrderRequest {
  processRequest: ProcessRequest;
  processResponse: ProcessResponse;
}
