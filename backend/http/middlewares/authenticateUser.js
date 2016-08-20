import User from '../../models/User';
import {verify} from '../../libs/jwt';

export default async(ctx, next) => {
  const token = getToken(ctx);

  if (!token) {
    ctx.throw(401, 'No authentication token found\n');
  }

  let decoded = null;
  try {
    decoded = await verify(token);
  } catch(err) {
    ctx.throw(401, 'Invalid token\n');
  }

  try {
    const user = await User.findById(decoded.id);
    if (!user) {
      ctx.throw(401, 'User not found\n');
    }
  } catch(err) {
    ctx.throw(401, 'User not found\n');
  }

  return next();
}

function getToken(ctx) {
  const header = ctx.request.header.authorization;
  if (!header) {
    return null;
  }
  const parts = header.split(' ');
  if (parts.length !== 2) {
    return null;
  }
  const scheme = parts[0];
  const token = parts[1];
  if (/^Bearer$/i.test(scheme)) {
    return token;
  }
  return null;
}