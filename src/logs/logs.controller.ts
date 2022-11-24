import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { LogModel } from "./log.interface";
import { LogsService } from "./logs.service";

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  public findAll(): Promise<Array<LogModel>> {
    return this.logsService.findAll();
  }

  @Get(':userId')
  public findByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<LogModel[]> {
    return this.logsService.findByUserId(userId);
  }
}