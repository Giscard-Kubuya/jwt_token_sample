const mysql = require('mysql');

const query = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'jwt_sample'
});

module.exports =  query;