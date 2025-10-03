import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateInternInput } from './create-intern.input';

@InputType()
export class UpdateInternInput extends PartialType(CreateInternInput) {}
