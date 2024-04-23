import { Repository } from 'typeorm';
import { validate as isUUID} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.repository.create(createProductDto);
      await this.repository.save(product);
      return product;
    } catch(error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.repository.find({
      take: limit,
      skip: offset
    });
  }

  async findOne(term: string) {
    let product: Product;
    if(isUUID(term)) {
      product = await this.repository.findOneBy({id: term});
    } else {
      const queryBuilder = this.repository.createQueryBuilder();
      product = await queryBuilder.where(`UPPER(title)=:title or slug=:slug`, {
        title: term.toUpperCase(),
        slug: term.toLowerCase()
      }).getOne();
    }
    if(!product) {
      throw new NotFoundException(`Product with ${term} not found`);
    }
    console.log('product', product)
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.repository.preload({
      id: id,
      ...updateProductDto
    })
    if(!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    try {
      await this.repository.save(product);
      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.repository.remove(product);
    return `Product with id ${id} removed`;
  }

  private handleDBExceptions(error: any) {
    if(error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
