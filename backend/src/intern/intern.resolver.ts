import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InternService } from './intern.service';
// import { Intern } from './intern.schema';
import { CreateInternInput } from './dto/create-intern.input';
import { UpdateInternInput } from './dto/update-intern.input';
import {Intern} from './intern.model';


@Resolver('Intern')
export class InternResolver {
  constructor(private readonly internService: InternService) {}

  @Mutation(() => Intern)
  async createIntern(@Args('createInternInput') createInternInput: CreateInternInput) {
    return this.internService.create(createInternInput);
  }

  @Query(() => [Intern])
  async getAllInterns() {
    return this.internService.findAll();
  }

  @Query(() => Intern)
  async getIntern(@Args('id') id: string) {
    return this.internService.findOne(id);
  }

  @Mutation(() => Intern)
  async updateIntern(
    @Args('id') id: string,
    @Args('updateInternInput') updateInternInput: UpdateInternInput,
  ) {
    return this.internService.update(id, updateInternInput);
  }

  @Mutation(() => Intern)
  async removeIntern(@Args('id') id: string) {
    return this.internService.remove(id);
  }
}
