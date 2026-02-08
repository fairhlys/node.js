/* 
包管理工具：
    包是什么：
        package，代表了一组特定功能的源码集合
    包管理工具：
        管理包的程序，可以对包进行下载安装卸载更新上传等等
    常见的有npm,yarn,pnpm
    pnpm将依赖包放在统一的地方

    pnpm安装包：
        1.初始化
            pnpm init
        2.安装包
            pnpm add uniq
            得到的lock文件是固定包的版本
        3.导入包
            const uniq = require('unqi')
        4.使用
    如果你现在要开发的包，用了其他的已有的包，那就称为依赖包

    开发依赖与生产依赖
        开发环境是程序员专门用来写代码的环境，一般是指程序员的电脑
        生产环境是项目代码正式运行的环境，一般指正式的服务器电脑
        因此在安装包的时候，也要表明安装的包是在生产环境还是开发花鸟卷
            生产依赖：开发和生产环境都需要
                -S
                在package.json里面：
                    "dependencies": {
                        "uniq": "^1.0.1"
                    },
            开发依赖：在生产环境中不需要
                -D
                在package.json中
                    "devDependencies": {
                         "less": "^4.5.1"
                     }
    安装指定版本的包：
        pnpm add uniq@版本号
    卸载：
        pnpm remove nodemon -g
    配置命令别名；
        在package.json中配置
        scripts:{
        
        }
    

*/