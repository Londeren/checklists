'use strict';
import jwt from 'jsonwebtoken';
import config from '../../config';


export const sign = (payload) => {
  return jwt.sign({...payload, iat: Math.floor(Date.now() / 1000)}, config.get('backend:jwt:secret'), {expiresIn: '1h'})
};

