import { Repository } from 'typeorm';
//@ts-ignore
export const repositoryMock: Repository<any> = {
  find: jest.fn(),
  findOne: jest.fn(),
  findOneOrFail: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};
