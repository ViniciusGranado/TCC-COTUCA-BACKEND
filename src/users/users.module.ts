import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { packagesProviders } from 'src/packages/packages.provider';
import { doorsProviders } from 'src/doors/doors.provider';
import { logsProviders } from '../logs/logs.providers';

@Module({
  providers: [UsersService, ...usersProviders, ...packagesProviders, ...doorsProviders, ...logsProviders],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
