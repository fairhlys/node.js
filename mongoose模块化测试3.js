// test.js
const connectDB = require('./mongoose模块化测试1');
const Book = require('./mongoose模块化测试2');

(async () => {
    try {
        // 1. 先连接数据库
        await connectDB();

        // 2. 示例：查询所有书籍（只返回 name 和 author，不返回 _id）
        const books = await Book.find()
            .select('name author -_id')
            .lean(); // lean() 返回普通 JS 对象，性能更好

        console.log('查询结果：', books);

        // 3. 示例：新增一本书
        // const newBook = await Book.create({
        //   name: '三国演义',
        //   author: '罗贯中',
        //   price: 19.9,
        //   style: '历史',
        //   is_hot: true,
        //   tags: ['历史', '军事', '社会'],
        //   publishDate: new Date(),
        // });
        // console.log('新增成功：', newBook);

    } catch (err) {
        console.error('操作失败：', err);
    } finally {
        // 建议：开发时可以关闭连接，生产环境通常保持长连接
        // await mongoose.disconnect();
    }
})();