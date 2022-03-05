import { Exclude } from 'class-transformer';
import { Upload } from 'src/modules/uploads/entities/upload.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Upload, (upload) => upload.user)
  uploads: Upload[];
}
