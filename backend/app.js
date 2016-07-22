import Koa from 'koa';
import cors from 'kcors';
import bodyParser from 'koa-bodyparser';
import router from './router';

import errorHandler from './http/middlewares/errorHandler';

const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(errorHandler);
app.use(router.routes());

export default app;