let mysql = require('mysql');
let connection = mysql.createConnection({
    host: "localhost",
    user: "jame",
    password: "",
    database: "exam_db"
})

connection.connect((error) => {
    if(!!error){
        console.log(error);
    }else{
        console.log('Connected...');
    }
})

module.exports = connection;
