/* 
    模块化：
        将一个复杂的程序文件依据一定规则拆分成多个文件的过程称为模块化
        其中拆分出的每一个文件就是一个模块，模块内部的数据是私有的，不过模块可以暴露内部数据以便其他模块使用

    1.模块的导出
        module.exports = {
            可以暴露任意数据
            know
        }
        或者
        exports.know = know
        在模块内部 exports = module.exports = {}
    2.导入模块
        const 对象名 = require(模块文件的路径)
        得到的对象有该模块导出的各种属性和方法
        require返回的是module.exports里面的值而不是exports
    注意：
        1.导入的是文件夹
            首先检测该文件夹下package.json文件中main属性对应的文件，如果存在则导入，反之则报错
            如果main属性不存在，或者package.json不存在，则会尝试导入文件夹下的index.js和index.json，如果还是没找到，就会报错
            导入node.js内置模块时，直接require模块的名字即可
    require导入自定义模块的基本流程；
        1.将相对路径转为绝对路径，定位目标文件
        2.缓存检测  检测之前有没有导入过该文件
        3.读取目标文件代码
        4.包裹一个函数并执行(立即执行函数)，通过argument.callee.toString()查看自执行函数
        5.缓存模块的值
        6.返回module.exports的值
    CommonJS规范：
        module.exports,exports以及require都是commonjs模块化规范中的内容
        而node.js是实现了commonjs模块化规范，二者关系有点像javascript和ecmascript（规范）
*/
const me = require('./模块化测试')
console.log(me);
me.konw()
me.tiemo()
