import Template from '../../models/Template';
import List from '../../models/List';
import HttpError from '../errors/HttpError';

export default class Api {
  static async templates(ctx) {
    const templates = await Template.find().exec();

    if (!templates) {
      throw new HttpError(404, 'Templates not found');
    }

    return ctx.body = {templates};
  }

  static async lists(ctx) {
    const lists = await List.find().exec();

    if (!lists) {
      throw new HttpError(404, 'Lists not found');
    }

    return ctx.body = {lists};
  }
}