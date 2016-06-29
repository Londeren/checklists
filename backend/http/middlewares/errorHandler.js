export default async (ctx, next) => {
  try {
    await next();
  } catch(err) {

    err.status = err.status || err.statusCode || 500;

    ctx.body = {
      message: err.message
    };
  }
}