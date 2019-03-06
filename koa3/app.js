
const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')  // 解析post传参中间件
const koaStatic = require('koa-static') // 加载静态资源中间件
const cors = require('koa2-cors') // 处理跨域中间件
import router from './routes'
const app = new Koa()

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

// 加载路由中间件
app.use(async (ctx, next) => {
  if(ctx.status === 404){
    ctx.body = '404'
    return
  }
  await next()
})

app.listen(8081, ()=>{
  console.log('Koa2 running at http://localhost:8081/')
})