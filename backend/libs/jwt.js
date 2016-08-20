import jwt from 'jsonwebtoken';
import Promise from 'bluebird';
import config from '../../config';

Promise.promisifyAll(jwt);

export const sign = (payload) => {
  return jwt.sign({...payload, iat: Math.floor(Date.now() / 1000)}, config.get('backend:jwt:secret'), {expiresIn: '1h'})
};

export const verify = (token) => {
  return jwt.verifyAsync(token, config.get('backend:jwt:secret'));
};

