const express = require('express')
const app = express()
app.get('/home', (req, res) => {
    res.end('hello express')
})
app.get('/',(req,res) => {
    console.log(req.method);
    console.log(req.url);
    console.log(req.path);
    console.log(req.headers);
    
    res.end('home')
})
app.listen(3000, () => {
    console.log('服务启动，端口号3000')
})