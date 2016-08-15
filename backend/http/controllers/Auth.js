'use strict';
import HttpError from '../errors/HttpError';

export default class Auth {
  static async login(ctx) {
    ctx.body = {
      login: 'test',
      token: 'qwerty'
    };
  }

  static async logout(ctx) {
    ctx.body = {
      status: 'success'
    };
  }
}