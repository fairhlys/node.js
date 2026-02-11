/* 

接口：
    一个接口就是一个路由规则
    一般返回给前端的数据是json格式
    resful api
        1.url中的路径表示资源，路径中不能有动词，例如create,delete,update等这些都不能有
        2.操作资源要与http请求方法对应
        3.操作结果要与http响应状态码对应
    json-server
        本身是一个js编写的工具包，可以快速搭建resful api服务
        1.快速安装：
            pnpm add json-server -g
        2.创建json文件，编写基本结构
        3.以json文件所在文件夹作为工作目录，执行命令
            json-server --watch db.json
        默认端口3000
    接口测试工具
        apipost
        apifox
        postman
    res.json({
        code: '',
        msg: '',
        data:null
    })

*/