const DB = require('../models/db')
const mydb = DB.getInstance ()

module.exports = {
    async getList(ctx) {
        let formData = ctx.request.body
        let result = await mydb.find('pay', formData)
        ctx.body = {
            data: result,
            code: 0
        }
    },
    async add(ctx) {
        let formData = ctx.request.body
        let result = await mydb.insert('pay', formData)
        ctx.body =  {
            data: result,
            code: 0
        }
    },
    async update(ctx) {
        let formData = ctx.request.body
        let result = await mydb.update('pay', formData)
        ctx.body = {
            data: result,
            code: 0
        }
    },
    async delete(ctx) {
        let formData = ctx.request.body
        let result = await mydb.delete('pay', formData)
        ctx.body = {
            data: result,
            code: 0
        }
    }
}
