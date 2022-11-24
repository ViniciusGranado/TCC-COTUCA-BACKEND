import { DataSource } from "typeorm";
import { Log } from "./logs.entity";

export const logsProviders = [
  {
    provide: 'LOGS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Log),
    inject: [DataSource],
  },
];