import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PokemonService } from './services/pokemon.service';
import { ProfileService } from './services/profile.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Get()
  async getAllPokemon() {
    return this.pokemonService.getAllPokemon();
  }
}

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Post('upsert')
  async upsertProfile(@Body() profileData: { name: string; pokemonIds: string[] }) {
    return this.profileService.upsertProfile(profileData.name, profileData.pokemonIds);
  }

  @Get(':id/pokemon')
  async getPokemon(@Param('id') profileId: string) {
    return this.profileService.getPokemonByProfile(profileId);
  }
}
