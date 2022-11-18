import { Module } from "@nestjs/common";
import { DoorRequestController } from "./doorRequest..controller";
import { DoorRequestService } from "./doorRequest.service";

@Module({
  providers: [DoorRequestService],
  controllers: [DoorRequestController],
  exports: [DoorRequestService],
})

export class DoorRequestModule {}
