import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Intern } from './intern.schema';
import { CreateInternInput } from './dto/create-intern.input';
import { UpdateInternInput } from './dto/update-intern.input';

@Injectable()
export class InternService {
  constructor(@InjectModel('Intern') private readonly internModel: Model<Intern>) {}

  async create(createInternInput: CreateInternInput): Promise<Intern> {
    const createdIntern = new this.internModel(createInternInput);
    return createdIntern.save();
  }

  async findAll(): Promise<Intern[]> {
    return this.internModel.find().exec();
  }

  async findOne(id: string): Promise<Intern | null> {
    return this.internModel.findById(id).exec();
  }

  async update(id: string, updateInternInput: UpdateInternInput): Promise<Intern | null> {
    return this.internModel.findByIdAndUpdate(id, updateInternInput, { new: true }).exec();
  }

  async remove(id: string): Promise<Intern | null> {
    return this.internModel.findByIdAndDelete(id).exec();
  }
}
