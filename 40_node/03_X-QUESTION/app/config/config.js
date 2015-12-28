'use strict';
module.exports = {
    name                    : 'X-QUESTION',
    /* production: 生产环境 development: 开发环境 */
    env                     : 'development',
    port                    : 2002,
    cookieSecret            : 'X-MEAN-SEED',// cookie密钥
    connectionString        : 'mongodb://localhost/questions'
}