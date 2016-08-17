'use strict';
import {sign} from '../../libs/jwt';
import HttpError from '../errors/HttpError';

export default class Auth {
  static async login(ctx) {
    ctx.body = {
      token: sign({
        id: '1',
        login: 'admin'
      })
    };
  }
}