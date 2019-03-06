const router = require('koa-router')()
const userController = require('../controllers/user')

const routers = router
  .get('/info.json', userController.getUserInfo)


module.exports = routers
