/* 
fs模块：
    可以实现与硬盘的交互，例如文件的出啊u女鬼剑，删除，重命名，移动
    还有文件内容的写入，读取以及文件夹的相关操作
    0.导入fs模块
        const fs = require('fs')
        require是全局方法，用来导入fs模块
写入：      
    1.writeFile异步写入(写文件，默认是覆盖的写，可以在选项设置里面修改)
        fs.writeFile(文件名,待写入的的数据,选项设置（可选）,写入回调函数)
            文件名如是不存在，则会自动创建
        fs.writeFile('./座右铭.txt', '伟大的文化大革命',{ flag: 'a' } err = >{})
            写入失败的话，则会创建错误对象err，成功的话err就是null
    2.fs.writeFileSync()同步的写入
        其余和异步一样，但是：writeFileSync 是同步函数，它会立即执行完成并返回结果，不需要回调函数。
    3.appendFile / appendFileSync追加写入
        appendFile作用是在文件尾部追加内容，其语法和weiteFile完全相同
        appendFileSync
    如果想要换行,添加的数据那就是\r\n
    4.选项设置：
        1.flag: 'a' 追加效果
    5.fs的流式写入（可以减少对文件的操作次数）
        1.创建写入流对象
            const ws = fs.createWriteStream(文件路径)
            相当于跟文件创建了一个通道，再利用write方法写入数据
        2.利用write方法写入数据（默认是覆盖的写），一次大概能写64kb的数据
            ws.write(数据)
        3.关闭通道
            ws.close()
    6.文件写入场景：
        当需要持久化保存数据的时候，应该想到文件写入

读取：
    1.readFile方法
        fs.readFile(文件路径，选项配置（可选），回调函数)
         fs.readFile('./data.txt',(err,data) => {
            err接收错误信息，data接收读取文件的数据,得到的data为Buffer对象
        })
    2.readFilesync方法
    3.fs的流式读取：
        1.创建流式读取对象
            const rs = fs.createReadStream('文件路径')
        2.绑定data事件
            rs.on('data', chunk => {
                当从文件中读取一块数据（64kb）之后，就执行一次回调函数，并将内容传递给形参chunk
                该函数会一直读取，直到读取完毕
                })
            rs.on('end', () => {
                //文件读取完后的回调函数
                })

    对于大文件的粘贴复制，一般要流式读取和流式写入，不过写入速度一般慢于读取速度
        const ws = fs.createWriteStream('文件路径)
        const rs = fs.createReadStream('文件路径)
        rs.on('data', chunk => {
            ws.write(chunk)
          }) 
        rs.on('end', ()=>{
            console.log('复制完毕')
          })
        简便写法：
            rs.pipe(ws); 
        
    查看代码的内存使用量：
        const process = require('process')
        console.log(process.memoryUsage())
        查看rss的值，该值为字节数，比如37777408kb，就是36,892mb

    文件的重命名和移动
        1.调用rename方法：
            fs.rename('旧的文件路径', '文件的新路径', err => {
                    回调函数
              })
            当然，根据它有回调函数就知道是异步函数，也有同步函数的版本renameSync
    
    删除：
        1.调用unlink方法
        fs.unlink('要删除的文件的路径'，err => {
                回调函数
          })
        2.调用rm方法也可以删除
        fs,rm('要删除的文件的路径', err => {
                回调函数
          })
            当然，根据它有回调函数就知道是异步函数，也有同步函数的版本rmSync

    文件夹操作：
        1.创建文件夹
            1.fs.mkdir('文件夹路径',配置对象（可选）, err => {
                回调函数
              })
                mk是make  dir是directory
            2.递归创建
             fs.mkdir('/a/b/c',{recursive: true}, err=>{
                
              })
            创建出来的是/a/b/c三个深层次的文件夹
        2.读取文件夹
            fs.readdir('文件夹路径', (err,data) => {
                err是错误信息，data是读取到的文件夹内容
              })
        3.删除文件夹 
            fs.rmdir('文件夹路径', err => {
                
              })
          递归删除文件夹
            配置对象：recursive: true
            fs.rm('要删除的文件夹的路径', {rescursive: true }, err => {
                可以删除多层次的文件夹
              })
    查看资源状态：
        1.调用stat方法
            fs.stat('资源路径', (err, data) => {
                data是该资源的相关信息，是对象
                data.isFile() 获取资源是否是文件
                data.isDirectory() 资源是否为文件夹
              })
    fs的相对路径参照物：命令行的工作目录
    绝对路径：
        利用__dirname ‘全局变量’ 始终保存的是所在文件的所在目录的绝对路径
    */
const fs = require('fs')
fs.writeFile('./座右铭.txt', '伟大的文化大革命', err => {
    if (err) {
        console.log(err)
        return
    }
    console.log('写入成功')
})
fs.writeFileSync('./data.txt', '同步的')
console.log(111);
fs.appendFile('./座右铭.txt', '其实不然', err => {
    if (err) {
        console.log(err);
        return
    }
    console.log('追加成功')
})
const ws = fs.createWriteStream('./data.txt')
ws.write('文化大革命万岁,毛主席万岁，王洪文副主席万岁，无产阶级专政下的继续革命理论万岁')
ws.close()
const first = setTimeout(() => {
    fs.readFile('./data.txt', (err, data) => {
        if (err) {
            return
        } else {
            console.log(data.toString())
        }
        clearTimeout(first)
    })
})
setTimeout(() => {
    const rs = fs.createReadStream('./data.txt')
    rs.on('data', chunk => {
        console.log(chunk.length)
        console.log(chunk.toString())
        fs.writeFileSync('./test1.txt', chunk)
    })
    rs.on('end', () => {
        console.log('读取完成');
        const process = require('process')
        console.log(process.memoryUsage());
        fs.rename('./test2.txt', './test2.txt', err => {
            if (err) {
                console.log(err);
                return
            }
            console.log('重命名成功');
            fs.unlink('./test2.txt', err => {
                if (err) {
                    console.log(err);
                    return
                } else {
                    console.log('删除成功');
                }
            })
        })
    })
}, 10)

// const files = fs.readdirSync('../node.js')
// console.log(files)
// files.forEach((ele ,index) => {
//     console.log(ele);
//     let data = ele.split('_')
//     let [num ,name] = data
//     if(Number(num) < 10) {
//         num = '0' + num
//     }
//     let newname = num + name
//     console.log(newname);
// })