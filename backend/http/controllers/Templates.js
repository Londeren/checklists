import Template from '../../models/Template';
import List from '../../models/List';
import HttpError from '../errors/HttpError';

export default class Templates {
  static async index(ctx) {
    const templates = await Template.find().exec();

    if (!templates) {
      throw new HttpError(404, 'Templates not found');
    }

    return ctx.body = {templates};
  }

  static async store(ctx) {

    console.dir(ctx.request.body);

    return ctx.body = 'store';
  }
}