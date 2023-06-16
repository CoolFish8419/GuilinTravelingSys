const mysql = require('mysql')
    //导入mysql模块
const db = mysql.createPool({
        host: '192.168.232.1',
        user: 'root',
        password: 'zhangli',
        database: 'guilin',
        port:'3306'
    })
    //创建数据库连接对象
module.exports = db
    // 向外共享db数据库连接对象