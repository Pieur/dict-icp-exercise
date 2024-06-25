import { RecommendationStatus } from 'Database/entities/gameRecommendation';
import { z } from 'zod';

export default class CreateGameRecommendationValidator {
  static schema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    genre: z.string().min(1, "Genre is required"),
    platform: z.string().min(1, "Platform is required"),
    description: z.string().min(1, "Description is required"),
  });

  static validate(data: any) {
    return this.schema.safeParse(data);
  }
}
