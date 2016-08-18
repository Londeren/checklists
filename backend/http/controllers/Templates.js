import Template from '../../models/Template';
import List from '../../models/List';
import HttpError from '../errors/HttpError';

export default class Templates {
  static async index(ctx) {
    const templates = await Template.find().exec();

    if (!templates) {
      throw HttpError.notFound('Templates not found');
    }

    return ctx.body = {templates};
  }

  /**
   * add template
   * @param ctx
   * @param next
   * @returns {string}
   */
  static async store(ctx, next) {
    let template = new Template(ctx.request.body);

    try {
      template = await template.save();
    } catch(err) {
      if (err.name === 'ValidationError') {

        throw HttpError.badRequest({message: err.message, errors: err.errors})
      } else {
        return next(err);
      }
    }
    return ctx.body = template.toJSON();
  }

  /**
   * update template
   * @param ctx
   * @param next
   */
  static async update(ctx, next) {
    const requestParams = ctx.request.body;

    try {
      await Template.update({id: requestParams.id}, {
          name: requestParams.name,
          items: requestParams.items
        },
        {runValidators: true}).exec();
    } catch(err) {
      if (err.name === 'ValidationError') {

        throw HttpError.badRequest({message: err.message, errors: err.errors})
      } else {
        return next(err);
      }
    }

    const template = await Template.findOne({id: requestParams.id}).exec();
    if (!template) {
      throw HttpError.notFound('Template not found');
    }

    ctx.body = template;
  }
}