import { RecommendationStatus } from 'Database/entities/gameRecommendation';
import { z } from 'zod';

export default class UpdateGameRecommendationValidator {
  static schema = z.object({
    name: z.string().optional(),
    status: z.nativeEnum(RecommendationStatus).optional(),
    genre: z.string().optional(),
    platform: z.string().optional(),
    description: z.string().optional(),
  });

  static validate(data: any) {
    return this.schema.safeParse(data);
  }
}
