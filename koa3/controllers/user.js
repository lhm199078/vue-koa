const DB = require('../models/db')
const mydb = DB.getInstance ()

module.exports = {
    async getUserInfo(ctx) {
        let formData = ctx.request.body
        let result = await mydb.find('users', formData)
        ctx.body = {
            data: result[0],
            code: 0
        }
    },
    async getUserList(ctx) {
        let formData = ctx.request.body
        let result = await mydb.find('users', formData)
        ctx.body = {
            data: result,
            code: 0
        }
    }
}