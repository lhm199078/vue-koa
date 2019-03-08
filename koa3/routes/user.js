const router = require('koa-router')()
const userController = require('../controllers/user')

const routers = router
  .get('/info.json', userController.getUserInfo)
  .get('/list.json', userController.getUserList)


module.exports = routers
