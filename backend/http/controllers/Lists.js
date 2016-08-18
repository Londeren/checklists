import List from '../../models/List';
import HttpError from '../errors/HttpError';

export default class Lists {
  static async index(ctx) {
    const lists = await List.find().exec();

    if (!lists) {
      throw HttpError.notFound('Lists not found');
    }

    return ctx.body = {lists};
  }
}