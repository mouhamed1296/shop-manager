import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryExists = await this.categoryRepository.findOne({
      where: { nom: createCategoryDto.nom, id_boutique : createCategoryDto.boutique },
    });

    if (categoryExists) {
      throw new ConflictException('Categorie déjà existante');
    }

    const category = this.categoryRepository.create(createCategoryDto);

    return this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find(
    //  {relations: ['produits']}

    );
  }

  findOne(id: number) {
    return this.categoryRepository.findOneBy({id});
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryExists = await this.categoryRepository.findOneBy({id});
    if (!categoryExists) {
      throw new BadRequestException('Categorie non existante');
    }

    const checkIfCategoryNameExists = await this.categoryRepository.findOneBy({nom: updateCategoryDto.nom, id_boutique : updateCategoryDto.boutique});
    if (checkIfCategoryNameExists) {
      throw new ConflictException('Categorie déjà existante');
    }

    return this.categoryRepository.update(id, updateCategoryDto);
  }

  async findByBoutique(idBoutique: number) {
    return this.categoryRepository.find({where: {id_boutique: idBoutique}});
  }

  async remove(id: number) {
    //check if category exists
    const categoryExists = await this.categoryRepository.findOneBy({id});
    if (!categoryExists) {
      throw new BadRequestException('Categorie non existante');
    }
    return this.categoryRepository.softDelete(id);
  }
}
