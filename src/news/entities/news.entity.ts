import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'varchar' })
  readonly title: string;

  @Column({ type: 'varchar' })
  readonly content: string;

  @Column({ type: 'timestamp without time zone' })
  readonly createdAt: string;
}
