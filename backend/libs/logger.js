import winston from 'winston';
import config from '../../config';

export default function(module) {
  const path = module.filename.split('/').slice(-2).join('/');

  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: config.get('NODE_ENV') === 'development' || config.get('NODE_ENV') === 'test' ? 'debug' : 'error',
        label: path
      })
    ]
  });
}