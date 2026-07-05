import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
    const productModel = {
        create: jest.fn(),
        find: jest.fn(),
        findById: jest.fn(),
    };
    let service: ProductsService;

    beforeEach(() => {
        jest.clearAllMocks();
        service = new ProductsService(productModel as any);
    });

    it('creates products with the model', async () => {
        const dto = { name: 'Apple', price: 1, description: 'Fresh' };
        productModel.create.mockResolvedValue({ id: '1', ...dto });

        await expect(service.create(dto)).resolves.toEqual({ id: '1', ...dto });
        expect(productModel.create).toHaveBeenCalledWith(dto);
    });

    it('rejects invalid product ids', async () => {
        await expect(service.getProduct('invalid-id')).rejects.toBeInstanceOf(BadRequestException);
        expect(productModel.findById).not.toHaveBeenCalled();
    });

    it('throws not found when a product is missing', async () => {
        productModel.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

        await expect(service.getProduct('507f1f77bcf86cd799439011')).rejects.toBeInstanceOf(NotFoundException);
    });
});
