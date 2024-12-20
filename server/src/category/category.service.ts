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
      where: { nom: createCategoryDto.nom },
    });

    if (categoryExists) {
      throw new ConflictException('Categorie déjà existante');
    }

    const category = this.categoryRepository.create(createCategoryDto);

    return this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryExists = await this.categoryRepository.findOneBy({id: id});
    if (!categoryExists) {
      throw new BadRequestException('Categorie non existante');
    }

    const checkIfCategoryNameExists = await this.categoryRepository.findOneBy({nom: updateCategoryDto.nom});
    if (checkIfCategoryNameExists) {
      throw new ConflictException('Categorie déjà existante');
    }

    return this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    //check if category exists
    const categoryExists = await this.categoryRepository.findOneBy({id: id});
    if (!categoryExists) {
      throw new BadRequestException('Categorie non existante');
    }

    //get rayons associated with this category
    //const rayonsOfCategory = await this.rayonRepository.find({where: {idCategory: id}}); 

    //delete rayons associated with this category
   // for (const rayon of rayonsOfCategory) {
  //    await this.rayonRepository.delete(rayon.id);
  //  }

    //check if rayons associated with this category have been deleted
   // const rayonsOfCategoryAfterDelete = await this.rayonRepository.find({where: {idCategory: id}});
   // if (rayonsOfCategoryAfterDelete.length > 0) {
   //   throw new BadRequestException('Rayons associés à cette catégorie non supprimés');
   // }

    //delete category
    return this.categoryRepository.delete(id);
  }
}
