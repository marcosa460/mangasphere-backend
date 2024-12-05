import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Manga {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column('simple-array', { nullable: true })
  genres?: string[];

  @Column({ nullable: true })
  author?: string;

  @Column({ nullable: true })
  coverImageUrl?: string;

  @Column({ default: () => 'new Date()' })
  createdAt: Date;
}
