/* 
mongodb:
    分布式文件存储的数据库
    管理数据，对数据进行增删改查
    atabase Name：填 faith（这就是你的数据库名）
    Collection Name：必须同时创建一个集合（Collection，像表），比如填 users 或 articles（随便起，先建一个空的集合，MongoDB 才会真正创建数据库）
        show dbs 查看数据库
        use 数据库 使用对应数据库,没有时自动创建
        db.createCollection('users') 创建集合，此时才算真正创建了数据库
        db.dropDatabase()
        show collections
        db.数据库名.集合名.drop()
        db.users.insertOne({ name:'唐凯峰', age: 18})
        db.users.find({age:18})
        db.users.updateOne({name:'唐凯峰'},{$set: {age: 21}})
        db.users.remove({name:'侯翠翠'})
    mongoose:
        对象文档模型库 连接>数据库>集合>文档
        回调被完全移除，只返回 Promise
        用来和mongo db进行交互
        pnpm add mongoose
        在js文件中：
        const mongoose = require('mongoose')
        mongoose.connect('mongodb(mongodb协议名)://127.0.0.1:27017/bilibili')，利用promise写then函数
        设置回调；
            mongoose.connect('mongodb://127.0.0.1:27017/bilibili', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                }).then(() => {
                console.log('数据库连接成功');
                官方推荐用once，该回调函数只执行一次

                创建文档的结构对象：
                let BookSchema = new mongoose.Schema({
                    name:String,
                    author:String,
                    price:Number
                })//设置集合里面的属性名和属性值的类型

                创建模型对象
                let BookModel = mongoose.model('books'(集合名称),BookSchema)
                对文档操作的封装对象

                新增
                (async () => {
                    try {
                        const newBook = await BookModel.create({
                        name: '西游记',
                        author: '吴承恩',
                        price: 19.9});
                        console.log('插入成功：', newBook);
                         } catch (err) {
                            console.log('插入失败：', err);
                        }
                    })


            })
            mongoose.connection.on('error', () =>{
                //设置连接失败的回调
            })
            mongoose.connection.on('close', () =>{
                //设置连接关闭的回调
            })
        连接数据库，数据库也要启动服务
            直接运行js文件
        关闭连接
            mongoose.disconnect()
            一般不用
    支持的字段类型
        字符串
        数字
        数组
        日期
        buffer
        mixed:mongoose.Schema.Types.Mixed任意类型
        objectId:对象id，需要mongoose.Schema.Types.ObjectId 必须是文档id
        Decimal128:高精度数字,需要使用mongoose.Schema.Types.Decimal128
    字段值检验：
        mongoose有一些内置验证器，可以对字段值进行验证
        name: {
                type:String,
                required: true,
                default: '匿名',
                enum(枚举值):['言情','都市','志怪','恐怖'],
                unique:true(必须重建集合才生效)
            },
    删除文档：
        删除一条：await bookModel.deleteOne({数据})
        删除多条：await bookModel.deleteMany({数据})
    更新文档
        更新一条：await bookModel.updateOne({name:'红楼梦'(标识)}, {新值})
        更新多条：await bookModel.updateMany({name:'红楼梦'(标识)}, {新值})
    读取文档：
        寻找一条：await bookModel.findById({'id')
        寻找多条：await bookModel.find({标识})
    条件控制：
        不能用> < !==
        > : $gt
        < : $lt
        >= : $gte
        <= : $lte
        !== : $ne
        or : $or
        and : $and
        正则表达式
    bookModel.find({ price: {$lt: 20} })
    bookModel.find({ $or: [{author:'曹雪芹'}, { author:'余华' }] })
    bookModel.find({ $and: [{ price: {$gt: 30} }, {price: {$lt: 70}}] })


*/
const mongoose = require('mongoose');

// 连接（推荐加一些选项，避免警告）
mongoose.connect('mongodb://127.0.0.1:27017/bilibili', {
})
    .then(() => {
        console.log('数据库连接成功');

        // 1. 定义 Schema
        const BookSchema = new mongoose.Schema({
            name: {
                type:String,
                required: true,
                default: '匿名',
                unique: true

            },
            author: String,
            price: Number,
            style:{
                enum: ['言情', '都市', '志怪', '恐怖'],
                type:String
            },
            is_hot: Boolean,
            tags: Array,
            data: Date
        });

        // 2. 创建 Model（注意：集合名会自动变成 books，小写+复数）
        const BookModel = mongoose.model('books', BookSchema);

        // 3. 插入数据（使用 async/await）
        (async () => {
            try {
                const newBook = await BookModel.create({
                    name: '西游记',
                    author: '吴承恩',
                    style:'志怪',
                    price: 19.9,
                    is_hot:true,
                    tags: ['鬼怪', '励志', '社会'],
                    data:new Date()
                });
                console.log('插入成功：', newBook);
                mongoose.disconnect()
            } catch (err) {
                console.log('插入失败：', err);
                return
            }
        })();
    })
    .catch((err) => {
        console.log('数据库连接失败：', err);
    });

// 可选：监听其他事件
mongoose.connection.on('error', (err) => {
    console.log('连接错误：', err);
});

mongoose.connection.on('close', () => {
    console.log('连接关闭');
});
// setTimeout(() => {
//     mongoose.disconnect()
// }, 5000)
