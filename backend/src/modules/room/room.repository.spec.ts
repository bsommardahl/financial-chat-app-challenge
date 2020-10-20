import { EntityManager } from 'typeorm';
import { Room } from '../../entities/Room.entity';
import { CustomLogger } from '../logger/CustomLogger';
import { RoomRepository } from './room.repository';

describe('Room Repository', () => {
  // @ts-ignore
  const mockEntityManager: EntityManager = {
    getRepository: jest.fn(),
  };
  // @ts-ignore
  const mockLogger: CustomLogger = {
    setContext: jest.fn(),
    log: jest.fn(),
  };
  let repository: RoomRepository;
  beforeEach(() => {
    repository = new RoomRepository(mockEntityManager, mockLogger);
  });
  it('should be define', () => {
    expect(repository).toBeDefined();
    expect(mockLogger.setContext).toHaveBeenCalledWith('RoomRepository');
  });
  it('findRoomByName', async () => {
    // @ts-ignore
    const mockRoom: Room = {
      id: -1,
      roomName: 'mockRoomName',
    };
    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(mockRoom);

    const foundRoom = await repository.findRoomByName(mockRoom.roomName);

    expect(foundRoom).toEqual(mockRoom);
    expect(findOneSpy).toHaveBeenCalled();
  });
  describe('findByNameOrCreate', () => {
    // @ts-ignore
    const mockRoom: Room = {
      id: -1,
      roomName: 'mockRoomName',
    };
    it('should return room when it exists', async () => {
      const findByNameOrCreateSpy = jest
        .spyOn(repository, 'findRoomByName')
        .mockResolvedValue(mockRoom);

      const foundRoom = await repository.findByNameOrCreate(mockRoom.roomName);

      expect(foundRoom).toEqual(mockRoom);
      expect(findByNameOrCreateSpy).toHaveBeenCalled();
    });
    it('should create a room when the room does not exists', async () => {
      const findByNameOrCreateSpy = jest
        .spyOn(repository, 'findRoomByName')
        .mockResolvedValue(undefined);
      const saveSpy = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockRoom);

      const foundRoom = await repository.findByNameOrCreate(mockRoom.roomName);

      expect(findByNameOrCreateSpy).toHaveBeenCalled();
      expect(saveSpy).toHaveBeenCalled();
      expect(foundRoom).toEqual(mockRoom);
    });
  });
});
