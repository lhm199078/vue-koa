const router = require('koa-router')()
const payController = require('../controllers/pay')

const routers = router
  .post('/list.json', payController.getList)
  .post('/add.json', payController.add)
  .post('/update.json', payController.update)
  .post('/delete.json', payController.delete)

module.exports = routers
