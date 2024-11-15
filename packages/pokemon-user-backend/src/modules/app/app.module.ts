import { Module } from '@nestjs/common';
import { DbModule } from '../database/db.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonService } from './services/pokemon.service';
import { ProfileService } from './services/profile.service';
import { PokemonController, ProfileController } from './app.controller';
import { Pokemon } from '../database/entities/pokemon.entity';
import { Profile } from '../database/entities/profile.entity';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([Pokemon, Profile])],
  providers: [PokemonService, ProfileService],
  controllers: [PokemonController, ProfileController],
})
export class AppModule { }