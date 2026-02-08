/* 
express框架：
    基于node.js的极简，灵活的web应用开发框架
    1.导入express
        const express = require('express')
    2.创建应用对象
        const app = express()
    3.创建路由
        app.get('/home', (req,res) => {
            res.end()
          })
        如果请求方法是get，请求url是/home，那么就会触发该回调函数
        app.all()这里是请求方法随意，只要url正确就行
        app.all('*')这里是请求方法和url随意，一般用于404 NOT FOUND
    4.监听端口，启动服务
        app.listen(端口号,() => {
            服务启动，执行该回调函数
          })
    5.获取请求报文参数
        req.method 获取请求报文方法
        req.httpVersion 获取http版本
        req.headers 获取请求头参数
        req.url 获取请求url
        req.path 获取请求路径
        req.query 获取请求查询参数，得到的是对象，比如?后面的键值对
        req.ip 获取客户端的ip地址
        req.get('host') 获取客户端ip地址和端口号
    6.获取页面路由参数
        访问：/product/456.html
        app.get('/:id.html',callback)
        获取url路由参数:
        req.params.id
    7.获取响应报文的参数
        res.statusCode
        res.statusMessage
        res.setHeader
        res.write
        res.end
    8.响应报文参数的设置；
        res.status()；设置响应状态码
        res.set('abc', 'qwe');设置响应头参数
        res.send();设置响应体数据，自动会设置charset=utf-8
        res.redirect(url网址):重定向
        res.download(文件地址):下载响应
        res.json(对象)
        res.sendFile(文件路径);把文件内容发送到响应体中
    9.中间件
        middleware中间件本质是一个回调函数
        中间件函数可以像路由回调一样访问请求对象，响应对象。就是路由拦截器
        1.全局中间件
        2.路由中间件
    
express路由：
    一个路由的组成有请求方法，路径和回调函数组成
    express中提供了一系列方法，可以很方便的使用路由，使用格式；
        app.<methods>(path,callback)
*/
const express = require('express')
const app = express()
app.get('/home', (req, res) => {
    res.end('hello express')
})
app.listen(3000, () => {
    console.log('服务启动，端口号3000')
})