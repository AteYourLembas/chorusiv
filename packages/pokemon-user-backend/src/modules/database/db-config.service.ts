import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { startDatabase } from "./db";
import { Pokemon } from './entities/pokemon.entity';
import { Profile } from './entities/profile.entity';

@Injectable()
export class DbConfigService {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {

    const dbConfig = await startDatabase();
    console.log('Database started successfully.');

    return {
      type: 'postgres',
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      entities: [Pokemon, Profile], // Consider autoload as we grow
      synchronize: false, // Initialize with init.sql
    };
  }
}
