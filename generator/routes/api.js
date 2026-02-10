// routes/api.js
const express = require('express');
const router = express.Router();

// 示例：获取首页数据
router.get('/home', (req, res) => {
    res.json({
        code: 0,
        message: 'success',
        data: {
            title: '欢迎使用 Vue + Express 项目',
            banners: ['banner1.jpg', 'banner2.jpg']
        }
    });
});

// 示例：登录（伪代码，实际要校验 + jwt）
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '123') {
        res.json({
            code: 0,
            message: '登录成功',
            data: { token: 'fake-jwt-token-xxx', user: { name: 'Ronald' } }
        });
    } else {
        res.status(401).json({ code: 401, message: '用户名或密码错误' });
    }
});

// 更多 API：/api/users、/api/products 等，按需加

module.exports = router;