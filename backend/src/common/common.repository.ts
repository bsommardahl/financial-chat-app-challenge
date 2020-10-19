import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  Repository,
  FindOneOptions,
  DeleteResult,
  FindManyOptions,
  FindConditions,
} from 'typeorm';

@Injectable()
export class CommonRepository<TEntity> {
  constructor(
    @InjectEntityManager() private readonly repository: Repository<TEntity>,
  ) {}

  public async find(
    options?: FindConditions<TEntity> | FindManyOptions<TEntity>,
  ): Promise<TEntity[]> {
    return await this.repository.find(options);
  }

  public async findOne(
    id: number,
    options?: FindOneOptions<TEntity>,
  ): Promise<TEntity | undefined>;
  public async findOne(
    conditions?: FindConditions<TEntity>,
    options?: FindOneOptions<TEntity>,
  ): Promise<TEntity | undefined>;
  public async findOne(
    options?: FindOneOptions<TEntity>,
  ): Promise<TEntity | undefined>;

  public async findOne(
    paramOne: number | FindConditions<TEntity> | FindOneOptions<TEntity>,
    options?: FindOneOptions<TEntity>,
  ): Promise<TEntity | undefined> {
    if (typeof paramOne === 'number') {
      if (options) return await this.repository.findOne(paramOne, options);
      return await this.repository.findOne(paramOne);
    }
    return await this.repository.findOne(paramOne);
  }

  public async findOneOrFail(
    id: number,
    options?: FindOneOptions<TEntity>,
  ): Promise<TEntity>;
  public async findOneOrFail(
    conditions?: FindConditions<TEntity>,
    options?: FindOneOptions<TEntity>,
  ): Promise<TEntity>;
  public async findOneOrFail(
    options?: FindOneOptions<TEntity>,
  ): Promise<TEntity>;

  public async findOneOrFail(
    paramOne: number | FindOneOptions<TEntity> | FindConditions<TEntity>,
    options?: FindOneOptions<TEntity>,
  ): Promise<TEntity> {
    if (typeof paramOne === 'number') {
      if (options)
        return await this.repository.findOneOrFail(paramOne, options);
      return await this.repository.findOneOrFail(paramOne);
    }
    return await this.repository.findOneOrFail(paramOne);
  }

  public async saveMany(entities: TEntity[]): Promise<TEntity[]> {
    return await this.repository.save(entities);
  }

  public async save(entity: TEntity): Promise<TEntity> {
    return await this.repository.save(entity);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
