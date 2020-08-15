const express = require('express'),
    app = express(),
    path = require('path'),
    router = require('./server/router'),
    bodyParser = require('body-parser'),
    database = require('./server/database')


app.use(express.static(__dirname + `/static`))
app.use(bodyParser.json())
router(app, path, database)
app.use(router)
app.listen('80', function () {
    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        console.log(`Server running on ${add}:8080`);
    })
})