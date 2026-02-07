/* 
node.js是什么
    node.js是一个开源的，跨平台的javascript运行环境
作用；
    服务器端开发、构建 API、命令行工具等，支持非阻塞 I / O。
    1.开发服务器应用
    2.开发工具类应用
    3.开发桌面端应用

命令行工具
    在命令行里面都是
        命令  参数1  参数2
    这样的格式
*/
console.log('hello node.js')
/* 
浏览器的javscript的核心语法是：ecmascript
node API:不包含dom和bom，和javascript是不一样的 ，不能使用dom和bom的api，可以使用console和定时器
    顶级对象是global，可以用globalThis访问顶级对象
*/
console.log(globalThis);
/* 
buffer：中文译为缓冲区，是一个类似array的对象，用于表示固定长度的字节序列
    换句话说，buffer就是一段固定长度的内存空间，用于处理二进制数据,每一个元素是八位的二进制，因此一个元素要是超过八位二进制的最大值会发生溢出
    特点：
        1.大小固定且不能调整
        2.buffer性能较好，可以直接操作计算机内存
        3.每个元素的大小为1字节
    创建方法：都是利用Buffer对象的方法
        1.alloc（分配）
            let buf = Buffer.alloc(10);创建大小为10个字节的buffer，每一个元素初始为0
        2.allocUnsafe
            let buf_2 = Buffer.allocUnsafe(10);创建的buffer不会自动清零，可能会包含旧的历史数据，因此不安全，但是创建速度块
        3.from
            let buf_3 = Buffer.from('hello'); 每一个字母都会转换为unicode的码值（unicode兼容ascii，转换后为16进制），from还能将数组转为buffer，数组中的每个元素转换为十六进制
    buffer的操作：
        buffer与字符串的转换:利用buffer的to_string方法,toString(参数)，开可以根据参数的大小进行进制转换，例如buf[0].toString(2)转换为二进制
        buffer可以直接通过[]的方法对数据进行处理,可以读写和修改
        溢出：
            

*/
let buf = Buffer.alloc(10);
console.log(buf);
let buf_2 = Buffer.allocUnsafe(10);
console.log(buf_2);
let buf_3 = Buffer.from('hello')
console.log(buf_3);
let buf_4 = Buffer.from([100, 101, 102, 103, 200])
console.log(buf_4);
console.log(buf_4.toString())
console.log(buf_4[1])
let buf_5 = Buffer.from('hello')
console.log(buf_5[0]);
console.log(buf_5[0].toString(2));
buf_5[0] = 95
console.log(buf_5.toString());
let buf_6 = Buffer.from('你好')
console.log(buf_6);




