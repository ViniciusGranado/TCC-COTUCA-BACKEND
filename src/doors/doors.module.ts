import { Module } from '@nestjs/common';
import { DoorsService } from './doors.service';
import { DoorController } from './doors.controller';
import { doorsProviders } from './doors.provider';
import { packagesProviders } from 'src/packages/packages.provider';
import { usersProviders } from 'src/users/users.providers';
import { doorRequestProviders } from 'src/doorRequest/doorRequest.provider';

@Module({
  providers: [
    DoorsService,
    ...doorsProviders,
    ...packagesProviders,
    ...usersProviders,
    ...doorRequestProviders
  ],
  controllers: [DoorController],
  exports: [DoorsService],
})
export class DoorModule {}
