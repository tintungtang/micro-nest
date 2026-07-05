import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
    let controller: ProductsController;
    const productsService = {
        create: jest.fn(),
        getProducts: jest.fn(),
        getProduct: jest.fn(),
    };

    beforeEach(async () => {
        jest.clearAllMocks();
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                {
                    provide: ProductsService,
                    useValue: productsService,
                },
            ],
        }).compile();

        controller = module.get<ProductsController>(ProductsController);
    });

    it('returns products for the HTTP list endpoint', async () => {
        const products = [{ name: 'Apple', price: 1, description: 'Fresh' }];
        productsService.getProducts.mockResolvedValue(products);

        await expect(controller.findAll()).resolves.toEqual(products);
        expect(productsService.getProducts).toHaveBeenCalledTimes(1);
    });

    it('delegates product creation to the service', async () => {
        const dto = { name: 'Apple', price: 1, description: 'Fresh' };
        productsService.create.mockResolvedValue({ id: '1', ...dto });

        await expect(controller.create(dto)).resolves.toEqual({ id: '1', ...dto });
        expect(productsService.create).toHaveBeenCalledWith(dto);
    });
});
