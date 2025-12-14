const mysql=require('mysql2');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const dp=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});


dp.connect((err)=>{
    if(err){
        console.error("error");
    }
    else {
        console.log("connected");
    }
});

module.exports=dp;

