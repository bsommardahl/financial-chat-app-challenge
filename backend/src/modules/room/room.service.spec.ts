import { Room } from '../../entities/Room.entity';
import { User } from '../../entities/User.entity';
import { repositoryMock } from '../../common/types';
import { CustomLogger } from '../logger/CustomLogger';
import { MessageRepository } from '../message/message.repository';
import { UserRepository } from '../user/user.repository';
import { ConnectUserDto } from './dtos/connecUser.dto';
import { NewMessage } from './dtos/NewMessage.dto';
import { RoomRepository } from './room.repository';
import { RoomService } from './room.service';

// @ts-ignore
const mockRoomRepository: RoomRepository = {
  ...repositoryMock,
  findRoomByName: jest.fn(),
  findByNameOrCreate: jest.fn(),
};

// @ts-ignore
const mockUserRepository: UserRepository = {
  ...repositoryMock,
};

// @ts-ignore
const mockMessageRepository: MessageRepository = {
  ...repositoryMock,
  saveMany: jest.fn(),
};

// @ts-ignore
const mockLogger: CustomLogger = {
  setContext: jest.fn(),
  log: jest.fn(),
};

describe('RoomService', () => {
  let service: RoomService;

  beforeEach(() => {
    service = new RoomService(
      mockRoomRepository,
      mockUserRepository,
      mockMessageRepository,
      mockLogger,
    );
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mockLogger.setContext).toHaveBeenCalled();
  });

  it('connectUser', async () => {
    const connectedUser: ConnectUserDto = {
      roomName: 'mockUser',
      socketId: 'mockSocket',
      username: 'mockUsername',
    };
    // @ts-ignore
    const mockRoom: Room = {
      id: -1,
      roomName: connectedUser.roomName,
      messages: [],
      users: [],
    };
    // @ts-ignore
    const mockAdminUser: User = {
      id: -1,
      username: 'mockAdmin',
    };

    mockRoomRepository.findByNameOrCreate = jest
      .fn()
      .mockResolvedValueOnce(mockRoom);
    mockRoomRepository.findRoomByName = jest
      .fn()
      .mockResolvedValueOnce(mockRoom);
    mockUserRepository.getOrCreateAdminUser = jest
      .fn()
      .mockResolvedValueOnce(mockAdminUser);

    const data = await service.connectUser(connectedUser);

    expect(mockRoomRepository.findByNameOrCreate).toHaveBeenCalled();
    expect(mockRoomRepository.findRoomByName).toHaveBeenCalled();
    expect(mockUserRepository.getOrCreateAdminUser).toHaveBeenCalled();
  });

  it('disconnectUser', async () => {
    const mockSocketId = 'mockSocket';
    // @ts-ignore
    const mockRoom: Room = {
      id: -1,
      roomName: 'mockRoom',
      messages: [],
      users: [],
    };
    // @ts-ignore
    const mockUser: User = {
      id: -1,
      username: 'mockUser',
      room: mockRoom,
      isOnline: true,
    };
    // @ts-ignore
    const mockAdminUser: User = {
      id: -1,
      username: 'mockAdmin',
    };

    mockUserRepository.findOneOrFail = jest
      .fn()
      .mockResolvedValueOnce(mockUser);
    mockUserRepository.getOrCreateAdminUser = jest
      .fn()
      .mockResolvedValueOnce(mockAdminUser);
    mockRoomRepository.findRoomByName = jest
      .fn()
      .mockResolvedValueOnce(mockRoom);

    const data = await service.disconnectUser(mockSocketId);

    expect(mockUserRepository.findOneOrFail).toHaveBeenCalled();
    expect(mockUserRepository.getOrCreateAdminUser).toHaveBeenCalled();
    expect(mockUserRepository.getOrCreateAdminUser).toHaveBeenCalledWith(
      mockRoom,
    );
    expect(mockUserRepository.save).toHaveBeenCalled();
    expect(mockUserRepository.save).toHaveBeenCalledWith({
      ...mockUser,
      isOnline: false,
    });
    expect(mockMessageRepository.save).toHaveBeenCalled();
    expect(mockRoomRepository.findRoomByName).toHaveBeenCalled();
  });

  it('addNewMessage', async () => {
    const newMessage: NewMessage = {
      message: 'Some message',
      roomName: 'mockRoom',
      socketId: 'mockSocketId',
      username: 'mockUsername',
    };
    // @ts-ignore
    const mockRoom: Room = {
      id: -1,
      roomName: 'mockRoom',
      messages: [],
      users: [],
    };
    // @ts-ignore
    const mockAdminUser: User = {
      id: -1,
      username: 'mockAdmin',
    };
    // @ts-ignore
    const mockUser: User = {
      id: -1,
      username: 'mockUsername',
      room: mockRoom,
      isOnline: true,
    };

    mockRoomRepository.findRoomByName = jest
      .fn()
      .mockResolvedValueOnce(mockRoom)
      .mockResolvedValueOnce(mockRoom);
    mockUserRepository.getOrCreateAdminUser = jest
      .fn()
      .mockResolvedValueOnce(mockAdminUser);
    mockUserRepository.findByUsernameOrCreate = jest
      .fn()
      .mockResolvedValueOnce(mockUser);

    const data = await service.addNewMessage(newMessage);

    expect(mockRoomRepository.findRoomByName).toHaveBeenCalled();
    expect(mockRoomRepository.findRoomByName).toHaveBeenCalledTimes(2);
    expect(mockMessageRepository.saveMany).toHaveBeenCalled();
    expect(mockUserRepository.getOrCreateAdminUser).toHaveBeenCalled();
  });
});
