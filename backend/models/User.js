import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';
import {sign} from '../libs/jwt';

Promise.promisifyAll(bcrypt);

const userSchema = new mongoose.Schema({
  login: {type: String, required: true, unique: true},
  login_lower: {type: String, unique: true},
  password: {type: String, required: true}
});

userSchema.pre('save', async function preSaveSetPassword(next) {
  const user = this;
  const SALT_ROUNDS = 10;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSaltAsync(SALT_ROUNDS);
    user.password = await bcrypt.hashAsync(user.password, salt);

    next();
  } catch(err) {
    return next(err);
  }
});

userSchema.pre('save', function preSaveSetLoginLower(next) {
  this.login_lower = this.login.toLowerCase();

  next();
});

userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.__v;
    delete ret.password;
    delete ret.login_lower;

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

userSchema.statics.findByLogin = function findByLogin(login) {
  const loginLower = login.toLowerCase();

  return this.findOne({login_lower: loginLower});
};

const User = mongoose.model('users', userSchema);

export default User;