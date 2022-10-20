import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserModel } from './users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public findAll(): Array<UserModel> {
    return this.usersService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): UserModel {
    return this.usersService.findOne(id);
  }

  @Post()
  public create(@Body() user: UserModel): UserModel {
    return this.usersService.create(user);
  }

  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number): void {
    this.usersService.delete(id);
  }
  @Put(':id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserModel,
  ): UserModel {
    return this.usersService.update(id, user);
  }
}