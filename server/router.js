module.exports = function (app, path, database) {
    app.post("/post/contact", function (req, res) {
        database.insertMessage(req.body.content, req.body.name, req.body.email, function (err, result) {
            if (err) {
                console.log(err)
                res.send({
                    error: true
                })
            }
            else {
                res.send({
                    err: false
                })
            }
        })
    })

    app.get("/webImageSample", function (req, res) {
        res.sendFile(path.join(__dirname, '..', 'static', 'files', 'myweb.png'))
    })

    app.get("/resume", function (req, res) {
        res.sendFile(path.join(__dirname, '..', 'static', 'files', 'resume.pdf'))
    })

    app.get("*", function (req, res) {
        let address = req.connection.remoteAddress
        const addressList = address.split(":")
        address = addressList.pop()
        database.insertIP(address, function (err, result) {
            if (err) {
                console.log(err)
            }
        })
        res.sendFile(path.join(__dirname, '..', 'static', 'html', 'index.html'))
    })
}