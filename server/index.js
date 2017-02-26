const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');

const app = new Koa();
const router = new Router();

const path = require('path');
const STATIC_ASSETS_ROOT = path.resolve(__dirname, '../clients');

router.get('/greetings', function (ctx, next) {

  const {
    callback
  } = ctx.query;

  const message = 'hello';

  ctx.status = 200;
  if (callback) {
    ctx.set('CONTENT-TYPE', 'text/javascript');
    ctx.body = `${callback} (${JSON.stringify({ message })})`;
  } else {
    ctx.body = { message };
  }
});

router.post('/greetings', function (ctx, next) {
  ctx.status = 200;
  ctx.body = {
    message: 'hello'
  };
});

app
  .use(static(STATIC_ASSETS_ROOT))
  .use(router.routes())
  .use(router.allowedMethods());

const {
  PORT = 8080
} = process.env;

app.listen(PORT);
console.log(`listening on port ${PORT}`);
