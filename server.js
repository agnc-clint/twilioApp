require('isomorphic-fetch');
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const dotenv = require('dotenv');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;
<<<<<<< HEAD
=======
const server = new Koa();
const router = new KoaRouter();

const bodyParser = require('koa-body')();

const user = [
  {
    name:'clint',
    email:'ans@gmail.com'
  }
];

router.get('/auth', ctx => {
  ctx.body = "Welcome"
});


router.get('/user/:id', ctx => {
  ctx.body = user[ctx.params.id];
  return user[ctx.params.id];
});

router.post('/sending', bodyParser, async (ctx, next) =>  {
  const repName = ctx.request.body.repName
  const repNum = ctx.request.body.repNum
  const yourName = ctx.request.body.yourName
  const yourEmail = ctx.request.body.yourEmail

  
  client.messages
    .create({
      body: "Dear " + repName+ ", " + yourName + " wants you to know she has her eye on our MORNING STAR | Solitaire",
      from: '+17198009368',
      to: repNum
    })
    .then(data => {
      ctx.body = data.error_code;
    });
});

server.use(router.allowedMethods());
server.use(router.routes());
server.use(require('koa-body')());
>>>>>>> production

app.prepare().then(() => {
  const server = new Koa();
  server.use(session({ sameSite: 'none', secure: true }, server));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: [
        'read_products',
        'write_products',
        'read_script_tags',
        'write_script_tags'
      ],
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;

        ctx.redirect('/');
      },
    }),
  );

  server.use(verifyRequest());
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;

  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});