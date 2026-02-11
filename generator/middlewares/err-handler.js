// middlewares/error-handler.js
module.exports = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || '服务器内部错误';

    // 开发环境可以返回更多信息
    if (process.env.NODE_ENV === 'development') {
        return res.status(status).json({
            code: status,
            message,
            stack: err.stack,
            error: err
        });
    }

    // 生产环境只返回简单信息
    res.status(status).json({
        code: status,
        message
    });
};