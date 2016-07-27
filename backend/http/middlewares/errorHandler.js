export default async (ctx, next) => {
  try {
    await next();
  } catch(err) {

    ctx.status = err.status || err.statusCode || 500;

    ctx.body = {
      message: err.message
    };
  }
}