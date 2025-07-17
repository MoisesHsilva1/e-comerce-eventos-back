import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../../src/module/products/products.controller';
import { ProductService } from '../../src/module/products/services/products.service';
import { Product } from '../../src/module/products/model/product.model';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductService;

  const mockProduct: Partial<Product> = {
    _id: 'abc123' as any,
    name: 'Product 1',
    description: 'Big product',
    category: 'drink',
    price: 22,
    image: 'www.imagem.com',
  };

  const mockProductService = {
    findAll: jest.fn().mockResolvedValue([mockProduct] as Product[]),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return products', async () => {
    const result = await controller.findAll();

    expect(result).toEqual([mockProduct]);
    expect(service.findAll).toHaveBeenCalled();
  });
});
