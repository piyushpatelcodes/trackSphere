import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppResolver } from './app.resolver';
import { InternSchema } from './intern/intern.schema';
import { Intern } from './intern/intern.model';
import { InternResolver }  from './intern/intern.resolver';
import { InternService }  from './intern/intern.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

    MongooseModule.forFeature([{ name: Intern.name, schema: InternSchema }]),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, 
      autoSchemaFile: true,
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, InternResolver, InternService],
})
export class AppModule {}
