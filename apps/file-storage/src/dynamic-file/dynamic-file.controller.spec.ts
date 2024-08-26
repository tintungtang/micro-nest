import { Test, TestingModule } from '@nestjs/testing';
import { DynamicFileController } from './dynamic-file.controller';

describe('DynamicFileController', () => {
  let controller: DynamicFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DynamicFileController],
    }).compile();

    controller = module.get<DynamicFileController>(DynamicFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
