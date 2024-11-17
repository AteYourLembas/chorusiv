import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @ManyToMany(() => Pokemon, (pokemon) => pokemon.profiles, { cascade: true })
  @JoinTable({
    name: 'pokemon_profile_map',
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
