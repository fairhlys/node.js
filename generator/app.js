var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
  origin: '*',          // 开发阶段用 *，上线改成你前端域名如 'http://localhost:5173' 或生产域名
  credentials: true     // 如果要带 cookie/token
}));

app.get('/', (req, res) => {
  res.json({ message: '后端 API 服务已启动' });
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.use('/api', require('./routes/api'));
// error handler
app.use((req, res, next) => {
  res.status(404).json({ code: 404, message: 'Not Found' });
});

// 错误处理也返回 JSON
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    code: err.status || 500,
    message: err.message || 'Server Error'
  });
});

module.exports = app;
