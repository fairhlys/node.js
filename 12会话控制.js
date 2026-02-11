/* 
    对会话进行控制
    用来区分用户：
        会话控制：
            cookie
            session
            token
    1.cookie:
        http服务器发送给用户浏览器并保存在本地的一小块数据
        cookie按照域名划分保存
        浏览器向服务器发送请求时，会自动将当前域名下可用的cookie设置在请求头中，然后传递给服务器
        比如说校验完身份后，后端发送cookie，前端接收到后本地化存储（存储在当前域名下），后续向服务器发送请求时就会自动携带cookie
        设置cookie
            res.cookie('name', 'zhangsan')
            生命周期：
            res.cookie('name', 'zhangsan',{ MaxAge: 60*1000 })
            删除cookie
                res.clearCookie('name')
            express读取cookie
                cookie-parser(中间件)
                将cookie挂载在req里面
                req.cookie
    2.session
        保存在服务器端的数据，保存当前访问用户的相关信息
        实现会话控制，可以识别用户的身份，快速获取当前用户的相关信息
        比如登录后，创建session信息，然后将session_id发送给浏览器，以响应cooki的形式发送
        浏览器保存cookie，发送请求时自动携带cookie，服务器通过cookie中的session_id的值确定用户身份
            express中可以用（中间件）express-session connect-mongo对session进行操作
            

*/