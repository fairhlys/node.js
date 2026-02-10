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
        app.use() 专门用来处理中间件和“兜底”路由
            app.use((req, res) => {
                res.status(404).send('<h1>404</h1>');
            });
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
        req.get('host') 获取客户端ip地址和端口号,请求头的数据
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
        res.redirect(url网址):重定向,会发送请求
        res.download(文件地址):下载响应
        res.json(对象)
        res.sendFile(文件路径);把文件内容发送到响应体中
        同一个请求的响应只能发送一次（只能调用一次 res.send、res.json、res.end、res.redirect 等会真正发送响应的方法）。
    9.中间件
        middleware中间件本质是一个回调函数
        中间件函数可以像路由回调一样访问请求对象，响应对象。就是路由拦截器
        1.全局中间件
            1.定义中间件函数
            function recordMiddleware(req,res,next) {
                req是截获的请求报文
                res是截获的响应报文
                next是一个函数，指向后续的路由回调，或者是中间件函数回调(也就是执行了中间件函数之后，还要执行对应app.get等的函数)
                next()
            }
            2.然后使用中间件函数
            app.use(recordMiddleware)
        2.路由中间件
        3.静态资源中间件：
         app.use(express.static(__dirname + 静态资源目录))
         设置了访问静态资源的目录,当要寻找静态资源时，自动会在该目录下寻找
         app.use(express.static(path.resolve(__dirname, 'package'))) 这行代码配置了静态文件服务，将 package 目录下的文件映射到应用的根路径 / 上。
        因此，请求 /index.html 时，Express 会从 package 目录中查找并返回 index.html 文件。
        后续的 app.get('/', ...) 路由永远不会被触发，因为静态中间件 express.static 的优先级更高（它在路由定义之前），它会先处理所有静态文件请求，包括 /index.html。
        Express 的 express.static默认只找 index.html
    10.获取请求体数据
        利用body-parser包
        const body_parser = require('body-parser')
        const jsonParser = body_parser.json()
            //解析json格式请求体
        const urlencodeParser = body_parser.urlencoded()
            //解析querystring格式的请求体
        app.post('/login',urlencodeParser,(req,res)=> {
            res.send('获取用户数据')
            urlencodeParser会往req里面添加一个body属性
        })
    11.防盗链
        防止外部网站盗用本网站资源
        一般都是禁止其他域名的网站来访问本域名的静态资源
        实现：通过请求头的referer属性的值，指明发送请求的域名
            app.use((req,res,next) => {
                //检测请求头中的referer
                let referer = req.get('referer')
                if(referer){
                    let url = new URL(referer)
                    let hostname = url.hostname
                    console.log(hostname);
                    if(hostname !== '127.0.0.1') {
                        res.status(404).send('<h1>404 NOT FOUND</h1>')
                        return
                    }
                }
                next()
            })
    12.路由模块化
        看包管理文件夹
    13.快速搭建express开发骨架
        pnpm add express-generator -g
        express -e 文件夹（将生成的文件装在哪个文件夹）
    14.文件上传
        formidable
    15.数据
    lowdb
    shortid

    
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