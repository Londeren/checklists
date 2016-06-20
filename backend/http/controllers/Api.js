import Template from '../../models/Template';
import HttpError from '../errors/HttpError';

export default class Api {
  static async templates(ctx, next) {
    const templates = await Template.find().exec();

    if (!templates) {
      throw new HttpError(404, 'Templates not found');
    }

    return ctx.body = templates;
  }
}