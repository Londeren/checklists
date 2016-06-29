/**
 * @todo http://stackoverflow.com/a/32749533/834003
 */
export default class HttpError extends Error {
  constructor(status, message) {
    super(message);

    this.name = this.constructor.name;
    this.message = message;
    this.status = status;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}