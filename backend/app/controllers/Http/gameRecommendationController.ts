import CreateGameRecommendationValidator from 'App/Validators/CreateGameRecommendationValidator';
import UpdateGameRecommendationValidator from 'App/Validators/UpdateGameRecommendationValidator';
import { GameRecommendation, RecommendationStatus } from 'Database/entities/gameRecommendation';
import { User } from 'Database/entities/user';
import { ic } from 'azle';
import { Response, Request } from 'express';

export default class GameRecommendationsController {
  static async create(request: Request, response: Response) {
    try {
      const validation = CreateGameRecommendationValidator.validate(request.body);

      if (!validation.success) {
        const error = validation.error.issues[0];
        response.status(400);
        return response.json({
          status: 0,
          message: `${error.path.join('.')}: ${error.message}`,
        });
      }

      const user = await User.findOneBy({ principal_id: ic.caller().toText() });
      if (!user) {
        response.status(400);
        return response.json({ status: 0, message: 'User not found.' });
      }

      const existingRecommendation = await GameRecommendation.findOneBy({ slug: validation.data.slug });
      if (existingRecommendation) {
        response.status(400);
        return response.json({ status: 0, message: 'Game recommendation slug already exists.' });
      }

      const recommendationData = {
        ...validation.data,
        user: user,
        status: RecommendationStatus.SHOWN,
        created_at: Date.now(),
        updated_at: Date.now(),
      };

      await GameRecommendation.save(recommendationData);

      return response.json({ status: 1, message: 'Game recommendation created successfully!' });
    } catch (error) {
      response.status(400);
      return response.json({ status: 0, message: 'error: recommendation not created' });
    }
  }

  static async update(request: Request, response: Response) {
    try {
      const { recommendationId } = request.params;
      const validation = UpdateGameRecommendationValidator.validate(request.body);

      if (!validation.success) {
        const error = validation.error.issues[0];
        response.status(400);
        return response.json({
          status: 0,
          message: `${error.path.join('.')}: ${error.message}`,
        });
      }

      const user = await User.findOneBy({ principal_id: ic.caller().toText() });
      if (!user) {
        response.status(400);
        return response.json({ status: 0, message: 'User not found.' });
      }

      const recommendation = await GameRecommendation.findOneBy({
        id: recommendationId as unknown as number,
        user: user,
      });
      if (!recommendation) {
        response.status(400);
        return response.json({ status: 0, message: 'Game recommendation not found.' });
      }

      if (validation.data.name) {
        recommendation.name = validation.data.name;
      }
      if (validation.data.genre) {
        recommendation.genre = validation.data.genre;
      }
      if (validation.data.platform) {
        recommendation.platform = validation.data.platform;
      }
      if (validation.data.description) {
        recommendation.description = validation.data.description;
      }

      recommendation.updatedAt = Date.now();
      await recommendation.save();

      return response.json({ status: 1, message: 'Game recommendation updated successfully!' });
    } catch (error) {
      response.status(400);
      return response.json({ status: 0, message: 'error:not updated' });
    }
  }

  static async view_all_by_user(request: Request, response: Response) {
    try {
      const user = await User.findOneBy({ principal_id: ic.caller().toText() });
      if (!user) {
        response.status(400);
        return response.json({ status: 0, message: 'User not found.' });
      }

      const recommendations = await GameRecommendation.find({ where: { user: user }, relations: { user: true } });
      return response.json({ status: 1, data: recommendations });
    } catch (error) {
      response.status(400);
      return response.json({ status: 0, message: 'error' });
    }
  }

  static async view_by_slug(request: Request, response: Response) {
    try {
      const { slug } = request.params;
      const recommendation = await GameRecommendation.findOne({
        where: { slug: slug, status: RecommendationStatus.SHOWN },
        relations: { user: true },
      });

      if (!recommendation) {
        response.status(400);
        return response.json({ status: 0, message: 'Game recommendation not found.' });
      }

      return response.json({ status: 1, data: recommendation });
    } catch (error) {
      response.status(400);
      return response.json({ status: 0, message: "error" });
    }
  }
}
