const query = require('../config/database.js');

exports.findAll = (req,res) =>{
    query.query('select * from users',(error,result)=>{
        console.log(result)
    })
}

exports.findOne = (email,callback)=>{
    query.query('select  * from users where email=?',[email.email],(err,res)=>{
        if(err) throw err;
        res = res.length>0?res[0]:null;
        return callback('',res)
    })
}

exports.create = (data,callback) =>{
    query.query('insert into users (username,email,password) values(?,?,?)',[data.username,data.email,data.password],(err,res)=>{
        if(err) throw err
        
        return callback(res);
    })
}
