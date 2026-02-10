const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const body_parser = require('body-parser');
const jsonParser = body_parser.json()
//解析json格式请求体
const urlencodeParser = body_parser.urlencoded()
//解析querystring格式的请求体

const homeRouter = require('./routes/homeRouter')
const adminRouter = require('./routes/adminRouter')
// 日志中间件
function RecordMiddleWare(req, res, next) {
    const { url, ip } = req;
    fs.appendFileSync(path.resolve(__dirname, './access.log'), `${url}, ${ip}\r\n`);
    console.log(req.query);
    next();
}

// 暗号校验中间件（全局，但可以排除某些路径）
function checkCode(req, res, next) {
    // 如果是根路径，直接放行（示例：根路径不需要暗号）
    if (req.path === '/') {
        return next();
    }

    if (req.query.code === '521') {
        next();
    } else {
        res.send('暗号错误');
    }
}
app.use(homeRouter)
app.use(RecordMiddleWare);
// app.use(checkCode);
app.use(express.static(path.resolve(__dirname , 'package')))
// app.get('/', (req, res) => {
//     res.send('hello express');
// });
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







app.post('/login',urlencodeParser,(req,res)=> {
    console.log(req.body);
    res.send('获取用户数据')
})
// 404 兜底
app.use((req, res) => {
    res.status(404).send('<h1>404</h1>');
});

app.listen(3000, () => {
    console.log('服务启动, 端口号 3000');
});