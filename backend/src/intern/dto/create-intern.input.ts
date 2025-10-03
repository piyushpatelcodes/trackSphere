import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsDate, IsOptional, IsArray } from 'class-validator';

@InputType()
export class CreateInternInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  college?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  course?: string;

  @Field(() => [String])
  @IsArray()
  skills: string[];

  @Field()
  @IsDate()
  startDate: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  endDate?: Date;
}
