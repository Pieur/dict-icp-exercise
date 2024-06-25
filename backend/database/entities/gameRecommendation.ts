import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

export enum RecommendationStatus {
  HIDDEN = 0,
  SHOWN = 1,
}

@Entity({
  name: 'game_recommendations',
})
export class GameRecommendation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  slug: string;

  @Column({ type: 'text' })
  gameTitle: string;

  @Column({ type: 'text' })
  genre: string;

  @Column({ type: 'text' })
  platform: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int', default: RecommendationStatus.SHOWN })
  status: RecommendationStatus;

  @Column({ type: 'bigint' })
  createdAt: number;

  @Column({ type: 'bigint' })
  updatedAt: number;
}
