/*
    http协议；
        超文本传输协议
    http请求报文：
        结构：
            1.请求行 请求方法 请求地址 http版本号
            2.请求头
            3.空白行
            4.请求体
                内容格式相当灵活
    http响应报文；
        结构：
            1.响应行
            2.响应头
            3.空白行
            4.响应体
    IP:表示网络中的设备
    端口：应用程序的数字标识，实现不同主机应用程序间的通信

  http模块：
      Node.js的http模块允许你创建一个简单的Web服务器，用于处理浏览器（或客户端）的HTTP请求。
    1.导入http模块
      const http = require('http')
    2.创建服务对象：
      const server = http.createServer(函数作为参数 (request,response) => { }  )
          这里的request是对请求报文的封装对象
          这里的response是对响应报文的封装对象
          每次有新的HTTP请求到达服务器时，这个回调函数就会被调用一次
    3.监听端口，启动服务
      server.listen(选择要监听的端口号, () => {
          当服务启动成功以后执行该回调函数
        })
    4.获取http请求报文
        1.获取请求方法
            request.methods
        2.获取请求url
            request.url
            只包含url中的路径和查询字符串
        3.获取http协议的版本号
            request.jttpVersion
        4.获取http的请求头
            request.headers
            得到的是一个对象，要想获得其中host的值，那就是request.headers.host
        5.获取http的请求体
            1.声明一个变量
                let body = ''
            2.绑定事件
                request.on('data', chunk => {
                    body += chunk.toString()
                    这里chunk是个buffer对象，这里的事件是读取请求体数据
                  })
                request.on('end', () => {
                    这里是读取数据完毕后触发的回调函数
                  })
        6.提取http请求报文的url和查询参数
            1.导入url模块
                const url = require('url')
            2.解析request.url
                let res = url.parse(request.url) 利用url中的方法解析request.url,如果在第二个参数加上参数true，则会自动将res中的query(查询参数)属性转换为对象
          简单的方法；
              1.实例化URL的对象
                  let url = new URL(request.url, '网址的前缀')
                得到的url是一个对象
              2.获取查询参数
                url.searchParams.get('参数名')
    5.获取http响应报文
        1.设置响应状态码
            response.statusCode = number
        2.响应状态的描述
            response.statusMessage = ''
        3.响应头；
                response.setHeader() 
            对于多个同名的响应头
                response.setHeader('test', ['a','b','c'])
                设置之后，响应头变为:
                    test:a
                    test:b
                    test:c
        4.响应体的设置
            response.write('')
            可以设置多次，追加的形式
            response.end('') 这个也可以设置响应体，可以是buffer类型，不过也可以不写，但是end是必要且唯一的
            这里的响应体甚至可以直接写html
    6.网页资源加载
        浏览器收到HTML后，不会停留在服务器端——它解析HTML标签，发现<link href="style.css">或<script src="script.js">，会自动发起新HTTP请求到相对路径（如/style.css）。
        服务器不关心HTML内容，它只管返回文件。资源加载是浏览器行为。
    7.静态资源和动态资源
        静态资源：内容长时间不发生改变的资源
        动态资源：内容经常改变的资源
        1.静态资源服务；
            const { pathname } = new URL(request.url, 'http://127.0.0.1')
            let filepath = __dirname + '/page' + pathname
            fs.readFile(filepath, (err, data) => {
              if(err) {
              response.statusCode = 500
              response.end('文件读取失败')
              return
              }
              response.end(data)
            })
        2.静态资源目录：
            http服务在哪个文件夹中寻找静态资源，那么那个文件夹就是静态资源目录，也成为网站根目录
            let filepath = __dirname + '/page' + pathname 像这个，page就是网站根目录，服务器只能在该page文件夹中找文件
    8.网页中的URL
        1.绝对路径:
        形式                                            特点
    http://atguigu.com/web                          直接向目标资源发送请求，容易理解。网站的外链会用到此形式
    //atguigu.com/web                               与页面URL的协议拼接形成完整URL再发送请求。大型网站用的比较多
        /web                                        与页面URL的协议、主机名、端口拼接形成完整URL再发送请求。中小型网站
        2.相对路径，发送请求时，需要与当前 url路径进行计算
    注意事项：
        1.终端中ctrl + c 暂停服务
        2.重启服务才能更新代码内容
        3.响应内容有中文就会乱码 主要是response的字符集出错，需要设置响应头参数
        4.http的默认端口是80，https的是443
        5.如果端口被其他应用程序占用，可以用资源监视器找到占有端口的程序，然后结束它

*/
// const url = require('url')
const http = require('http')
const server = http.createServer((request, response) => {
    response.setHeader('content-type', 'text/html;charset=utf-8') //设置响应头，必须设置在响应体之前
    // console.log(request.method)
    // console.log(request.url)
    // console.log(request.httpVersion)
    // console.log(request.headers)
    let body = ''
    // let res = url.parse(request.url, true)
    // console.log(res);
    let url = new URL(request.url, 'http://127.0.0.1')
    console.log(url);
    request.on('data', chunk => {
        body += chunk.toString()
    })
    request.on('end', () => {
        console.log(body);
    })
    response.statusCode = 203
    response.statusMessage = 'hah'
    response.end(`<table style=" border: 1px solid red"><tr><td></td><td></td><td></td></tr> </table>`) // 设置响应体
})
server.listen(9000, () => {
    console.log('服务启动');

})