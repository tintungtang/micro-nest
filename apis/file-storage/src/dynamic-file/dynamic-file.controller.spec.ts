import { Test, TestingModule } from '@nestjs/testing';
import { DynamicFileController } from './dynamic-file.controller';
import { DynamicFileService } from './dynamic-file.service';

describe('DynamicFileController', () => {
    let controller: DynamicFileController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DynamicFileService],
            controllers: [DynamicFileController]
        }).compile();

        controller = module.get<DynamicFileController>(DynamicFileController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
