import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'meanings' })
export class Meaning {
  @PrimaryColumn({ name: 'id', type: 'uuid', unique: true, update: false })
  id!: string;

  @Column({ name: 'text', length: 100 })
  text!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date;
}
