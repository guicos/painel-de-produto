import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prismaService';
import { Product, Prisma } from '@prisma/client';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

/*   async findOne(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    try {
      return this.prisma.product.findUnique({
        where: productWhereUniqueInput,
      });
    } catch (e) {
      throw new Error(`${e}`)
    }
  } */

  create(data: Prisma.ProductCreateInput): Promise<Product> {
    try {
      return this.prisma.product.create({
        data,
      });
    } catch (e) {
      throw new Error(`${e}`)
    }
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.product.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (e) {
      throw new Error(`${e}`)
    }
  }

  update(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: UpdateProductDto;
  }): Promise<Product> {
    try {
      const { where, data } = params;
      return this.prisma.product.update({ where, data });
    } catch (e) {
      throw new Error(`${e}`)
    }
  }

  remove(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    try {
      return this.prisma.product.delete({
        where,
      });
    } catch (e) {
      throw `${e}`
    }
  }
}
