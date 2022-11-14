import {
  Injectable,
  Inject,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserModel } from './users.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
  ) { }


  private users: Array<UserModel> = [];
  public findAll(): Array<UserModel> {
    return this.users;
  }

  public findOne(id: number): UserModel {
    const user: UserModel = this.users.find((user) => user.userId === id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  public findOneByTag(tagId: string): UserModel {
    // const user: UserModel = this.users.find((user) => user.tagId === tagId);
    const user = this.usersRepository.

    if (!user) {
      throw new NotFoundException('User tag not found.');
    }

    return user;
  }

  public create(user: UserModel) {
    const nameExists: boolean = this.users.some(
      (userIterated) => userIterated.name === user.name,
    );
    if (nameExists) {
      throw new UnprocessableEntityException('this user name already exists.');
    }

    const maxId: number = Math.max(...this.users.map((user) => user.userId));
    const id: number = maxId + 1;

    const userPost: UserModel = {
      ...user,
      userId: id,
    };
    this.users.push(userPost);
    return userPost;
  }

  public delete(id: number): void {
    const index: number = this.users.findIndex((user) => user.userId === id);

    if (index === -1) {
      throw new NotFoundException('User not found.');
    }

    this.users.splice(index, 1);
  }

  public update(id: number, user: UserModel): UserModel {
    const index: number = this.users.findIndex((user) => user.userId === id);

    if (index === -1) {
      throw new NotFoundException('User not found.');
    }

    const userExists: boolean = this.users.some(
      (userIterated) =>
        userIterated.name === user.name &&
        userIterated.surname === user.surname,
    );
    if (userExists) {
      throw new UnprocessableEntityException('this user already exists');
    }

    const userPost: UserModel = {
      ...user,
    };

    this.users[index] = userPost;

    return userPost;
  }
}
