import {
  Inject,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DoorRequest, DoorResponse } from 'src/models/models';
import { Package } from 'src/packages/packages.entity';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { Door } from './doors.entity';
import { DoorModel } from './doors.interface';

@Injectable()
export class DoorsService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,

    @Inject('PACKAGES_REPOSITORY')
    private packagesRepository: Repository<Package>,
    
    @Inject('DOORS_REPOSITORY')
    private doorsRepository: Repository<Door>,
  ) {}

  private doors: Array<DoorModel> = [];
  public findAll(): Array<DoorModel> {
    return this.doors;
  }

  public findOne(id: number): DoorModel {
    const door: DoorModel = this.doors.find((door) => door.id === id);
    if (!door) {
      throw new NotFoundException('Door not found.');
    }
    return door;
  }
  public create(door: DoorModel): DoorModel {
    const doorExists: boolean = this.doors.some((item) => item.id === door.id);
    if (doorExists) {
      throw new UnprocessableEntityException('Door already exists');
    }
    const maxId: number = Math.max(...this.doors.map((door) => door.id), 0);
    const id: number = maxId + 1;

    const doorPost: DoorModel = {
      ...door,
      id,
    };
    this.doors.push(doorPost);
    return doorPost;
  }

  public delete(id: number): void {
    const index: number = this.doors.findIndex((door) => door.id === id);
    if (index === -1) {
      throw new NotFoundException('Door not found');
    }
  }

  public update(id: number, door: DoorModel): DoorModel {
    const index: number = this.doors.findIndex((door) => door.id === id);
    if (index === -1) {
      throw new NotFoundException('Door not found');
    }
    const doorExists: boolean = this.doors.some(
      (doorIterated) => doorIterated.id === door.id,
    );
    if (doorExists) {
      throw new UnprocessableEntityException('Door already exists');
    }

    const doorPost: DoorModel = {
      ...door,
      id,
    };
    this.doors[index] = doorPost;
    return doorPost;
  }

  public async requestDoor(doorRequest: DoorRequest): Promise<DoorResponse> {
    const door = await this.doorsRepository
      .createQueryBuilder('door')
      .where('door.packageId IS NULL')
      .andWhere('door.size = :size', { size: doorRequest.size })
      .printSql()
      .getOne();
    
    if (!door) {
      throw new PreconditionFailedException('Door with the given specification not available');
    }

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    
    const todayString = yyyy + '-' + mm + '-' + dd;

    const packageInsertResult = await this.packagesRepository
      .createQueryBuilder('package')
      .insert()
      .into(Package)
      .values({
          userId: doorRequest.userId,
          receivementDate: todayString,
          retrieved: false,
      })
      .execute();

    const newPackageId: number = packageInsertResult.raw.insertId;

    await this.doorsRepository
      .createQueryBuilder('door')
      .update(Door)
      .set({ packageId: newPackageId })
      .where("id = :id", { id: door.id })
      .execute();

    return {
      packageId: newPackageId,
      doorId: door.id,
      doorNumber: door.doorNumber,
    };
  }
}
