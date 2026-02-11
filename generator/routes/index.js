// routes/api/index.js
const express = require('express');
const router = express.Router();

// 引入子路由
const authRouter = require('./route/auth');
const userRouter = require('./route/user');

// 挂载子路由
router.use('/auth', authRouter);
router.use('/user', userRouter);

// 示例：根 /api 测试接口
router.get('/', (req, res) => {
    res.json({ message: 'API 服务正常' });
});

module.exports = router;