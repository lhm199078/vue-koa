/**
 * @file 拷贝浏览器页面升级页面到项目
 * @author lixiaobin
 */

let fs = require('fs')
let path = require('path')
let upgradeHtmlName = 'upgrade.html'
let sourceFile =  path.resolve(path.dirname('./'), '../public/html', upgradeHtmlName)
let destPath = path.resolve(path.dirname('./'), './dist', upgradeHtmlName)

let readStream = fs.createReadStream(sourceFile)
let writeStream = fs.createWriteStream(destPath)
readStream.pipe(writeStream)
console.log('upgrade.html复制完成')