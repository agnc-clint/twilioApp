require('isomorphic-fetch');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const next = require('next');
const dotenv = require('dotenv');
const session = require('koa-session');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');

dotenv.config();
const {default: graphQLProxy} = require('@shopify/koa-shopify-graphql-proxy');
const {ApiVersion} = require('@shopify/koa-shopify-graphql-proxy');
const { route } = require('next/dist/next-server/server/router');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;
const server = new Koa();
const router = new KoaRouter();

const bodyParser = require('koa-body')();

const user = [
  {
    name:'clint',
    email:'ans@gmail.com'
  }
];

router.get('/', ctx => {
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

app.prepare().then(() => {
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
        // ctx.cookies.set('shopOrigin', shop, {
        //     httpOnly: false,
        //     secure: true,
        //     sameSite: 'none'
        // })
        ctx.redirect('/');
      },
    }),
  );

server.use(graphQLProxy({version: ApiVersion.October20}));  
  server.use(verifyRequest());
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;

  });

  server.listen(port, () => {
    console.log(`> Resady on http://localhost:${port}`);
  });
});