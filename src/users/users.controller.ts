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
import { InjectDataSource, InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { get } from 'http';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { User } from './users.entity';
import { UserModel } from './users.interface';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor (
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectEntityManager() private userManager: EntityManager,
    @InjectDataSource() private dataSource: DataSource,
    private readonly usersService: UsersService
    
    ) {}

  @Get()
  public findAll(): Array<UserModel> {
    return this.usersService.findAll();
  }

  @Get()
  public async getUserByQuery(userId): Promise<User>{
    const userWithRepository = await this.userRepository.createQueryBuilder("get")
    .where("user.id = :userId", {userId})
    .getOne()
    return userWithRepository;
  }
  @Get()
  public async getUserByQueryJoin(userId){
    const user = this.userManager
    .createQueryBuilder(User, "user")
    .leftJoin("packages", "package")
    .where("package.userId = :"+userId)
    //.andWhere("")
    return user;
  }

  // exemplo usando left join
  // const user = this.userManager
  //     .createQueryBuilder(User, "user")
  //     .leftJoin("course"."id", "course")
  //     .where("course.name = :name", { name: "JavaScript Fundamentals" })
  //     .andWhere("course.length = :length", { length: "8 hours" })

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): UserModel {
    return this.usersService.findOne(id);
  }

  @Get('/tag/:tagId')
  public find(@Param('tagId') tagId: string): UserModel {
    // return this.usersService.findOneByTag(tagId);
  return this.usersService.
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
