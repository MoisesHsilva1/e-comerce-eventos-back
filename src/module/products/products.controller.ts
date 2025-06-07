import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ProductService } from './services/products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get('/listAll')
  @ApiOperation({ summary: 'Get all Products' })
  @ApiResponse({ status: 200, description: 'Success' })
  async findAll() {
    return this.productService.findAll();
  }

  @Get('/searchByName')
  @ApiOperation({ summary: 'Get products by name' })
  @ApiResponse({ status: 200, description: 'Success' })
  async searchByName(@Query('name') name: string) {
    return this.productService.findByProductName(name);
  }

  @Get('/id/:id')
  @ApiOperation({ summary: 'Get products by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  async searchByID(@Param('id') id: string) {
    return this.productService.findByProductID(id);
  }

  @Post('/create')
  @ApiOperation({ summary: 'create products ' })
  @ApiResponse({ status: 201, description: 'Success' })
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    const uploudedImage = await cloudinary.uploader.upload(file.path);

    return this.productService.create({
      ...createProductDto,
      image: uploudedImage.secure_url,
    });
  }
}
