const Router = require('koa-router')
const DB = require('../models/db')
const mydb = DB.getInstance ()

let refund = new Router()
refund.get('/list.json', async (ctx, next) => {
  let result = await mydb.find('refund', {})
  ctx.body = {data: result}
})

refund.get('/add.json', async (ctx, next) => {
  let result = await mydb.insert('refund', {title: 'koa2-moogodb'})
  ctx.body = {data: result}
})

refund.get('/update', async (ctx, next) => {
  let result = await mydb.update('refund', {title: 'koa2'}, {title: 'koa'})
  ctx.body = {data: result}
})

refund.get('/delete', async (ctx, next) => {
  let result = await mydb.delete('refund', {title: 'koa2-moogodb'})
  ctx.body = {data: result}
})

export default refund