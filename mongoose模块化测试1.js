// db/connect.js
const mongoose = require('mongoose');

// 全局配置（只设置一次）
mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/bilibili', {
            // 可选：推荐加上这些配置
            serverSelectionTimeoutMS: 5000, // 超时 5 秒
        });
        console.log('MongoDB 连接成功');
    } catch (err) {
        console.error('MongoDB 连接失败:', err);
        process.exit(1); // 连接失败直接退出程序（生产环境常见做法）
    }
};

// 导出连接函数（只连接一次）
module.exports = connectDB;