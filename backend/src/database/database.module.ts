import { DynamicModule, Module } from '@nestjs/common';
import { AppConfigDatabase } from '../app.config.provider';
import { InternalServerErrorException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from '../films/schemas/films.schema';
import { MongoFilmsRepository } from '../repository/MongoDB/films.repository';
import { PostgresFilmsRepository } from '../repository/PostgreSQL/films.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmEntity } from '../films/entities/film.entity';
import { ScheduleEntity } from '../films/entities/schedule.entity';

@Module({})
export class DatabaseModule {
  static register(databaseConfig: AppConfigDatabase): DynamicModule {
    const imports = [];
    const providers = [];
    const exports = [];

    try {
      const { driver, url, username, password, port, database } =
        databaseConfig;

      switch (driver) {
        case 'mongodb':
          imports.push(
            MongooseModule.forRoot(url),
            MongooseModule.forFeature([
              { name: Film.name, schema: FilmSchema },
            ]),
          );
          providers.push({
            provide: 'FILMS_REPOSITORY',
            useClass: MongoFilmsRepository,
          });
          exports.push('FILMS_REPOSITORY');
          break;
        case 'postgres':
          imports.push(
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: url,
              port,
              username,
              password,
              database,
              entities: [FilmEntity, ScheduleEntity],
              synchronize: false,
            }),
            TypeOrmModule.forFeature([FilmEntity, ScheduleEntity]),
          );
          providers.push({
            provide: 'FILMS_REPOSITORY',
            useClass: PostgresFilmsRepository,
          });
          exports.push('FILMS_REPOSITORY');
          break;
        default:
          throw new InternalServerErrorException(
            `Unsupported database driver: ${driver}`,
          );
      }

      return {
        module: DatabaseModule,
        imports,
        providers,
        exports,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to connect to the database:',
        error.message,
      );
    }
  }
}
