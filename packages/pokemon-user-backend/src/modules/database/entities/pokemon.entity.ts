import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from './profile.entity';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  pokemon_type: string;

  @ManyToMany(() => Profile, (profile) => profile.pokemon)
  profiles: Profile[];
}
