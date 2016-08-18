'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';
import {sign} from '../libs/jwt';

Promise.promisifyAll(bcrypt);

const userSchema = new mongoose.Schema({
  login: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

userSchema.pre('save', async function preSaveUser(next) {
  const user = this;
  const SALT_WORK_FACTOR = 10;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSaltAsync(SALT_WORK_FACTOR);
    user.password = await bcrypt.hashAsync(user.password, salt);

    next();
  } catch(err) {
    return next(err);
  }
});

userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.__v;
    delete ret.password;

    ret.id = ret._id;
    delete ret._id;

    return ret;
  }
});

userSchema.methods.validatePassword = function validatePassword(password) {
  const user = this;

  return bcrypt.compareAsync(password, user.password);
};

userSchema.methods.generateToken = function generateToken() {
  const user = this;

  return sign({id: user.id});
};

const User = mongoose.model('users', userSchema);

export default User;