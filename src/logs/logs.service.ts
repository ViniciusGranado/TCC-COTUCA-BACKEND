import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { LogModel } from "./log.interface";
import { Log } from "./logs.entity";

@Injectable()
export class LogsService {
  constructor(
    @Inject('LOGS_REPOSITORY')
    private logsRepository: Repository<Log>,
  ) { }

  private users: Array<LogModel> = [];

  public async findAll(): Promise<Array<LogModel>> {
    const users = await this.logsRepository
      .createQueryBuilder('log')
      .getMany();

    return users;
  }

  public async findByUserId(id: number): Promise<LogModel[]> {
    const logs = await this.logsRepository
      .createQueryBuilder('log')
      .where('log.userId = :id', { id: id })
      .getMany();

    return logs;
  }
}
