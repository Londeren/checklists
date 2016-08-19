'use strict';
import User from '../../models/User';
import HttpError from '../errors/HttpError';

export default class Auth {
  static async login(ctx) {
    const {login, password} = ctx.request.body;

    const user = await User.findByLogin(login);
    if (!user) {
      throw HttpError.unauthorized('Login/password pair is incorrect');
    }

    const isMatch = await user.validatePassword(password);

    if (!isMatch) {
      throw HttpError.unauthorized('Login/password pair is incorrect');
    }

    ctx.body = {
      token: user.generateToken(),
      user: user
    };
  }
}