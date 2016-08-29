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

  /**
   * add list
   * @param ctx
   * @param next
   * @returns {string}
   */
  static async store(ctx, next) {
    let list = new List(ctx.request.body);
    list.set({user: ctx.state.authUser.id});

    try {
      list = await list.save();
    } catch(err) {
      if (err.name === 'ValidationError') {

        throw HttpError.badRequest({message: err.message, errors: err.errors})
      } else {
        return next(err);
      }
    }
    return ctx.body = list.toJSON();
  }

  /**
   * update list
   * @param ctx
   * @param next
   */
  /*static async update(ctx, next) {
    const requestParams = ctx.request.body;

    try {
      await Template.update({id: requestParams.id, user: ctx.state.authUser.id}, {
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
  }*/
}