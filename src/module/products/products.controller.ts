import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ProductService } from './services/products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get('/listAll')
  @ApiOperation({ summary: 'Get all Products' })
  @ApiResponse({ status: 201, description: 'Sucess' })
  async findAll() {
    return this.productService.findAll();
  }

  @Get('/searchByName')
  @ApiOperation({ summary: 'Get products by name' })
  @ApiResponse({ status: 201, description: 'Sucess' })
  async searchByName(@Query('name') name: string) {
    return this.productService.findByProductName(name);
  }

  @Get('/id/:id')
  @ApiOperation({ summary: 'Get products by id' })
  @ApiResponse({ status: 201, description: 'Success' })
  async searchByID(@Param('id') id: string) {
    return this.productService.findByProductID(id);
  }
}
