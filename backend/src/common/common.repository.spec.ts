import { Test, TestingModule } from '@nestjs/testing';
import { CommonRepository } from './common.repository';

describe('CommonRepository', () => {
  let service: CommonRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonRepository],
    }).compile();

    service = module.get<CommonRepository>(CommonRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
