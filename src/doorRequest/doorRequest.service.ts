import { Injectable } from "@nestjs/common";
import { DoorRequest } from "./doorRequest.entity";
import { DoorRequestModel } from "./DoorRequest.interface";

@Injectable()
export class DoorRequestService {
  private doorRequests: Array<DoorRequestModel> = [];

  public findAll(): Array<DoorRequestModel> {
    return this.doorRequests;
  }
}
