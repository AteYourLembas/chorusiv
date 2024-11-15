import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  pokemon_type: string;
}
