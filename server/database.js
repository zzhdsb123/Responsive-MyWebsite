let mysql = require('mysql'),
    con

function connect() {
    con = mysql.createConnection({
        host: 'myweb.cbkrgrymkhhh.us-east-2.rds.amazonaws.com',
        user: 'admin',
        password: 'q1Q!shitshit',
        database: "myweb"
    })
}

function insertMessage(message, name, email, callback) {
    connect()
    let today = new Date()
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()
    let sql = `insert into contact (message, name, email, date) values ("${message}", "${name}", "${email}","${date}")`
    con.query(sql, function (err, result) {
        if (err) {
            callback(err, null)
        }
        else{
            callback(null, result)
        }
        con.end()
    })
}

// create tables
function createTable() {
    connect()
    con.connect(function (err) {
        if (err){
            console.log(err)
        }
        else{
            const sql = 'CREATE TABLE IF NOT EXISTS contact (' +
                'ID int not null AUTO_INCREMENT,' +
                'message varchar(2555) not null,' +
                'name varchar(255) not null,' +
                'email varchar(255) not null,' +
                'date varchar(255) not null,' +
                'primary key (ID)' +
                ')'
            con.query(sql, function (err, result) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log('table created!')
                }
                con.end()
            })
        }
    })
}

createTable()

module.exports = {
    insertMessage,
}


