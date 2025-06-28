import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  UseInterceptors,
  Body,
  UploadedFile,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { ProductService } from './services/products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { CloudinaryService } from 'src/module/image/service/cloudinary.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productService: ProductService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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

  @Delete("/delete/:id")
  @ApiOperation({ summary: "Delete product by id"})
  @ApiResponse({ status: 204, description: "Sucess"})
  async deleteProduct(@Param("id") id: string) {
    return this.productService.deleteProduct(id)
  }

  @Put('/create')
  @ApiOperation({ summary: 'create products ' })
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateProductDto,
  ) {
    const uploadedImage = await this.cloudinaryService.uploadImage(file);

    const product = await this.productService.create({
      ...body,
      image: uploadedImage.secure_url,
    });

    return product;
  }
}
