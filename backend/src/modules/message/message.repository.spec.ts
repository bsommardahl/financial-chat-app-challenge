import { EntityManager } from 'typeorm';
import { MessageRepository } from './message.repository';

describe('Message Repository', () => {
  // @ts-ignore
  const mockEntityManager: EntityManager = {
    getRepository: jest.fn(),
  };
  let repository: MessageRepository;
  beforeEach(() => {
    repository = new MessageRepository(mockEntityManager);
  });
  it('should be define', () => {
    expect(repository).toBeDefined();
  });
});
