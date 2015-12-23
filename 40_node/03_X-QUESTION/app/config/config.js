'use strict';
module.exports = {
    name                    : 'X-QUESTION',
    /* production: �������� development: �������� */
    env                     : 'production',
    port                    : 2002,
    cookieSecret            : 'X-MEAN-SEED',// cookie��Կ
    connectionString        : 'mongodb://localhost/questions'
}