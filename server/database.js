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
    con.connect(function (err) {
        if (err){
            console.log(err)
        }
        else {
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
    })

}

function insertIP(address, location, callback) {
    console.log(location)
    connect()
    con.connect(function (err) {
        if (err){
            console.log(err)
        }
        else {
            let today = new Date()
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()

            let sql = `select ip.ID, ip.address, ip.date from myweb.ip where ip.address = "${address}" order by ip.ID desc limit 1`
            con.query(sql, function (err, result) {
                if (err) {
                    callback(err, null)
                }
                else {
                    if (result.length !== 0) {

                        let lastTime = result[0].date.split(":").pop(),
                            time = date.split(":").pop()
                        if (time-lastTime <= 5 || lastTime - time >= 55) {
                            callback(null, null)
                        }
                        else {
                            sql = `insert into ip (address, date, location) values ("${address}", "${date}", "${location}")`
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

                    }
                    else {
                        sql = `insert into ip (address, date) values ("${address}", "${date}")`
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


                }
            })

        }
    })
}

// create tables
function createTable() {
    connect()
    con.connect(function (err) {
        if (err){
            console.log(err)
        }
        else {
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
                createTableIP()
            })
        }
    })
}

function createTableIP() {
    connect()
    con.connect(function (err) {
        if (err){
            console.log(err)
        }
        else{
            const sql = 'CREATE TABLE IF NOT EXISTS ip (' +
                'ID int not null AUTO_INCREMENT,' +
                'address varchar(255) not null,' +
                'date varchar(255) not null,' +
                'location varchar(255) not null,' +
                'primary key (ID)' +
                ')'
            con.query(sql, function (err, result) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log('IP table created!')
                }
                con.end()
            })
        }
    })
}

createTable()

module.exports = {
    insertMessage,
    insertIP
}


