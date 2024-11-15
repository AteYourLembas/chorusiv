import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pokemon } from '../entities/pokemon.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @ManyToMany(() => Pokemon) // Many-to-Many relationship with the Pokemon entity
  @JoinTable({
    name: 'pokemon_profile_map', // Name of the join table
    joinColumn: {
      name: 'profile_uuid',
      referencedColumnName: 'uuid',
    },
    inverseJoinColumn: {
      name: 'pokemon_uuid',
      referencedColumnName: 'uuid',
    },
  })
  pokemon: Pokemon[];
}