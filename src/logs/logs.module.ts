import { Module } from "@nestjs/common";
import { LogsController } from "./logs.controller";
import { logsProviders } from "./logs.providers";
import { LogsService } from "./logs.service";

@Module({
  providers: [LogsService, ...logsProviders],
  controllers: [LogsController],
  exports: [LogsService],
})
export class LogsModule {}
