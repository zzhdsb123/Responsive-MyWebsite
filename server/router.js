module.exports = function (app, path, database, fetch) {
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
        fetch(`http://ip-api.com/json/${address}`)
            .then(response => response.json())
            .then(data => {
                let location = ""
                if (data.status === "success") {
                    // console.log(`${data.country} ${data.regionName} ${data.city}`)
                    location = `${data.country} ${data.regionName} ${data.city}`
                }
                database.insertIP(address, location, function (err, result) {
                    if (err) {
                        console.log(err)
                    }
                })
            })

        res.sendFile(path.join(__dirname, '..', 'static', 'html', 'index.html'))
    })
}