import { EntityManager } from 'typeorm';
import { User } from '../../entities/User.entity';
import { Room } from '../../entities/Room.entity';
import { CustomLogger } from '../logger/CustomLogger';
import { UserRepository } from './user.repository';

describe('User Repository', () => {
  // @ts-ignore
  const mockEntityManager: EntityManager = {
    getRepository: jest.fn(),
  };
  // @ts-ignore
  const mockLogger: CustomLogger = {
    setContext: jest.fn(),
    log: jest.fn(),
  };
  let repository: UserRepository;
  beforeEach(() => {
    repository = new UserRepository(mockEntityManager, mockLogger);
  });
  it('should be define', () => {
    expect(repository).toBeDefined();
    expect(mockLogger.setContext).toHaveBeenCalledWith('UserRepository');
  });
  // @ts-ignore
  const mockRoom: Room = {
    id: -1,
    roomName: 'mockRoomName',
  };
  describe('findByUsernameOrCreate', () => {
    // @ts-ignore
    const mockUser: User = {
      id: -1,
      username: 'mockUserName',
      socketId: 'mockSocketId',
      room: mockRoom,
    };
    it('should return user when it exists', async () => {
      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockUser);

      const foundUser = await repository.findByUsernameOrCreate(
        mockUser.username,
        mockUser.socketId,
        mockRoom,
      );

      expect(foundUser).toEqual(mockUser);
      expect(findOneSpy).toHaveBeenCalled();
    });
    it('should create a user when the user does not exists', async () => {
      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(undefined);
      const saveSpy = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockUser);

      const foundUser = await repository.findByUsernameOrCreate(
        mockUser.username,
        mockUser.socketId,
        mockRoom,
      );

      expect(findOneSpy).toHaveBeenCalled();
      expect(saveSpy).toHaveBeenCalled();
      expect(foundUser).toEqual(mockUser);
    });
  });
  describe('getOrCreateAdminUser', () => {
    // @ts-ignore
    const mockAdminUser: User = {
      id: -1,
      username: 'mockUserName',
      socketId: 'mockSocketId',
      room: mockRoom,
    };
    it('should return admin user when it exists', async () => {
      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockAdminUser);

      const foundUser = await repository.getOrCreateAdminUser(mockRoom);

      expect(foundUser).toEqual(mockAdminUser);
      expect(findOneSpy).toHaveBeenCalled();
    });
    it('should create a admin user when the admin user does not exists', async () => {
      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(undefined);
      const saveSpy = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockAdminUser);

      const foundUser = await repository.getOrCreateAdminUser(mockRoom);

      expect(findOneSpy).toHaveBeenCalled();
      expect(saveSpy).toHaveBeenCalled();
      expect(foundUser).toEqual(mockAdminUser);
    });
  });
});
