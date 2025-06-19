import { Test, TestingModule } from '@nestjs/testing';
import { DynamicFileService } from './dynamic-file.service';

describe('DynamicFileService', () => {
  let service: DynamicFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamicFileService],
    }).compile();

    service = module.get<DynamicFileService>(DynamicFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
