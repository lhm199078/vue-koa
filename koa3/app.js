
const Koa = require('koa')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')  // 解析post传参中间件
const koaStatic = require('koa-static') // 加载静态资源中间件
const cors = require('koa2-cors') // 处理跨域中间件
const session = require('koa-session')
const MongooseStore = require('koa-session-mongoose')
import router from './routes'
const app = new Koa()

mongoose.connect('mongodb://localhost:27017/library',{ useNewUrlParser:true })

app.keys = ['some secret key']


// 处理OPTIONS多发预检测问题
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://test.xue.com');
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Allow-Headers', 'content-type');
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, HEAD, PUT, POST, DELETE, PATCH');
  // 这个响应头的意义在于，设置一个相对时间，在该非简单请求在服务器端通过检验的那一刻起，
  // 当流逝的时间的毫秒数不足Access-Control-Max-Age时，就不需要再进行预检，可以直接发送一次请求。
  ctx.set('Access-Control-Max-Age', 3600 * 24);
  // let cookie = ctx.cookies.get('SESSION_ID')
  // let isUser = ctx.request.url === '/user/info.json'
  // if(!cookie && !isUser){
  //   ctx.body = {
  //     message: '请登陆',
  //     data: null,
  //     code: '000001'
  //   }
  //   return
  // }
  if(ctx.status === 200){
    ctx.body = '404'
    return
  }
  if (ctx.method == 'OPTIONS') {
      ctx.body = 200; 
  } else {
      await next();
  }
})

// 解析中间件，解析post传参
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(koaStatic(
  path.join(__dirname , './static')
))

// 处理跨域
app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous']
}))

app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods())

app.listen(8081, ()=>{
  console.log('Koa2 running at http://localhost:8081/')
})