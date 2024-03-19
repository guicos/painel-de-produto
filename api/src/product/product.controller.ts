import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product as ProductModel} from '@prisma/client';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductModel[]>  {
    await this.productService.create(createProductDto);
    return this.productService.findAll({})
  }

  @Get()
  findAll(
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<ProductModel[]> {
    return this.productService.findAll({ skip: +skip, take: +take});
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<ProductModel[]> {
    await this.productService.update({ where: { id: +id}, data: updateProductDto });
    return this.productService.findAll({})
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productService.remove({id: +id});
    return this.productService.findAll({})
  }
}
