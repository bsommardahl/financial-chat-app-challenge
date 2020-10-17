import { Test, TestingModule } from '@nestjs/testing';
import { RoomRepository } from './room.repository';

describe('MessageRepository', () => {
  let service: RoomRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomRepository],
    }).compile();

    service = module.get<RoomRepository>(RoomRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
