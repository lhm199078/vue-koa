
let debugUrl = 'http://127.0.0.1:8081'
// let debugUrl = 'https://dev-zhifu.huatu.com'
const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
function resolve(dir) {
    return path.join(__dirname, dir)
}
const envStr = process.env.env

module.exports = {
    lintOnSave: true,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('vue$', 'vue/dist/vue.esm.js')
            .set('library', resolve('common-frontend/src'))
        if (envStr === 'prod') {
            console.log('prod')
        }
    },
    configureWebpack: {
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: true
                        }
                    }
                })
            ]
        },
        plugins: [
            new webpack.DefinePlugin(
                {
                    'envStr': JSON.stringify(envStr)
                }
            )
        ]
    },
    devServer: {
        port: 5023,
        proxy: {
            '/*.task': {
                target: debugUrl
            },
            '/*.json': {
                target: debugUrl
            },
            '/*.do': {
                target: debugUrl
            }
        }
    }
}