import { CommonRepository } from './common.repository';
import { repositoryMock } from './types';

class TEntity {}

describe('CommonRepository', () => {
  let service: CommonRepository<TEntity>;

  beforeEach(() => {
    service = new CommonRepository<TEntity>(repositoryMock);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should call find method', async () => {
    await service.find();

    expect(repositoryMock.find).toHaveBeenCalled();
  });
  describe('when saving entities', () => {
    it('should call save method', async () => {
      const entity = new TEntity();
      await service.save(entity);

      expect(repositoryMock.save).toHaveBeenCalled();
      expect(repositoryMock.save).toHaveBeenCalledWith(entity);
    });
    it('should call save method with array', async () => {
      const entity = new TEntity();
      const entity2 = new TEntity();
      const arr = [entity, entity2];
      await service.saveMany(arr);

      expect(repositoryMock.save).toHaveBeenCalled();
      expect(repositoryMock.save).toHaveBeenCalledWith(arr);
    });
  });
  it('should call delete method', async () => {
    const mockId = 1;
    await service.remove(mockId);

    expect(repositoryMock.delete).toHaveBeenCalled();
    expect(repositoryMock.delete).toHaveBeenCalledWith(mockId);
  });
  it('should call findOneOrFail method', async () => {
    const mockId = 1;
    await service.findOneOrFail(mockId);

    expect(repositoryMock.findOneOrFail).toHaveBeenCalled();
    expect(repositoryMock.findOneOrFail).toHaveBeenCalledWith(mockId);
  });
  it('should call findOne method', async () => {
    const mockId = 1;
    await service.findOne(mockId);

    expect(repositoryMock.findOne).toHaveBeenCalled();
    expect(repositoryMock.findOne).toHaveBeenCalledWith(mockId);
  });
});
