// app.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// 引入路由
const apiRouter = require('./routes/index');

// 引入错误处理中间件
const notFound = require('./middlewares/not-found');
const errorHandler = require('./middlewares/err-handler');

const app = express();

// 全局中间件（顺序很重要）
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 跨域
app.use(cors({
  origin: '*',  // 上线改成具体域名
  credentials: true
}));

// 路由挂载
app.use('/api', apiRouter);

// 404 处理（放在所有路由之后）
app.use(notFound);

// 全局错误处理（放在最后）
app.use(errorHandler);

module.exports = app;