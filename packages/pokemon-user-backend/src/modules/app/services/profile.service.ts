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

    async getAllProfiles() {
        return this.profileRepository.find({
            relations: ['pokemon'], // Include the related Pokémon data!
        });
    }

    async upsertProfile(name: string, pokemonIds: string[]) {
        let profile = await this.profileRepository.findOne({
            where: { name },
            relations: ['pokemon'],
        });

        const pokemonEntities = await this.pokemonRepository.findBy({
            uuid: In(pokemonIds),
        });

        if (profile) {
            // Update existing profile
            profile.pokemon = pokemonEntities; // Replace Pokémon association
        } else {
            // Create new profile
            profile = this.profileRepository.create({
                name,
                pokemon: pokemonEntities,
            });
        }

        // Save the profile, which also updates the linking table
        return this.profileRepository.save(profile);
    }
}
