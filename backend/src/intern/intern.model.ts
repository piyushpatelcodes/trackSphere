import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Intern {
  @Field(() => ID) 
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  college?: string;

  @Field({ nullable: true })
  course?: string;

  @Field(() => [String])
  skills: string[];

  @Field()
  startDate: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field(() => [String], { nullable: true })
  projectAssigned: string[]; 
}
