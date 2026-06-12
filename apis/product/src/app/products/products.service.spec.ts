import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
    const prisma = {
        product: {
        create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
    };
    let service: ProductsService;

    beforeEach(() => {
        jest.clearAllMocks();
        service = new ProductsService(prisma as any);
    });

    it('creates products with Prisma', async () => {
        const dto = { name: 'Apple', price: 1, description: 'Fresh' };
        prisma.product.create.mockResolvedValue({ id: '1', ...dto });

        await expect(service.create(dto)).resolves.toEqual({ id: '1', ...dto });
        expect(prisma.product.create).toHaveBeenCalledWith({ data: dto });
    });

    it('returns products from Prisma', async () => {
        const products = [{ id: '1', name: 'Apple', price: 1, description: 'Fresh' }];
        prisma.product.findMany.mockResolvedValue(products);

        await expect(service.getProducts()).resolves.toEqual(products);
        expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
    });

    it('rejects empty product ids', async () => {
        await expect(service.getProduct('   ')).rejects.toBeInstanceOf(BadRequestException);
        expect(prisma.product.findUnique).not.toHaveBeenCalled();
    });

    it('throws not found when a product is missing', async () => {
        prisma.product.findUnique.mockResolvedValue(null);

        await expect(service.getProduct('missing-product')).rejects.toBeInstanceOf(NotFoundException);
        expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id: 'missing-product' } });
    });
});
