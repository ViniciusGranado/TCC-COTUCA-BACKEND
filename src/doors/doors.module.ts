import { Module } from '@nestjs/common';
import { DoorsService } from './doors.service';
import { DoorController } from './doors.controller';
import { doorsProviders } from './doors.provider';
import { packagesProviders } from 'src/packages/packages.provider';
import { usersProviders } from 'src/users/users.providers';
import { doorRequestProviders } from 'src/doorRequest/doorRequest.provider';
import { logsProviders } from '../logs/logs.providers';

@Module({
  providers: [
    DoorsService,
    ...doorsProviders,
    ...packagesProviders,
    ...usersProviders,
    ...doorRequestProviders,
    ...logsProviders,
  ],
  controllers: [DoorController],
  exports: [DoorsService],
})
export class DoorModule {}
