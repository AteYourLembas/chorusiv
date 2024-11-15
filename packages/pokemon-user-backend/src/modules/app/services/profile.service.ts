import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Pokemon } from '../../database/entities/pokemon.entity';
import { Profile } from '../../database/entities/profile.entity';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Pokemon)
        private readonly pokemonRepository: Repository<Pokemon>,
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
    ) { }

    async upsertProfile(name: string, pokemonIds: string[]) {
        const profile = await this.profileRepository.findOne({
            where: { name },
            relations: ['pokemon'], // Ensure existing relationships are loaded
        });

        const pokemonEntities = await this.pokemonRepository.findBy({ uuid: In(pokemonIds) });

        if (profile) {
            // Update existing profile if it exists
            profile.pokemon = pokemonEntities;
            return this.profileRepository.save(profile);
        } else {
            // Otherwise add new profile
            const newProfile = this.profileRepository.create({
                name,
                pokemon: pokemonEntities,
            });
            return this.profileRepository.save(newProfile);
        }
    }

    async getPokemonByProfile(profileId: string) {
        const profile = await this.profileRepository.findOne({
            where: { uuid: profileId },
            relations: ['pokemon'],
        });
        return profile ? profile.pokemon : [];
    }
}
