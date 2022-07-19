import Router from '@koa/router';
import Koa from 'koa';
import koaBody from 'koa-body';

const app = new Koa();

const router = new Router({ prefix: '/api' });

app.use(router.allowedMethods()).use(router.routes()).use(koaBody());
//maybe switch to use discord api endpoints

export default app;
