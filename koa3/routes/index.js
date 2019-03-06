const Router = require('koa-router')
import user from './user'
import pay from './pay'
import refund from './refund'
const router = new Router()

router.use('/user', user.routes(), user.allowedMethods())
router.use('/pay', pay.routes(), pay.allowedMethods())
router.use('/refund', refund.routes(), refund.allowedMethods())

export default router