module.exports = function (app, path, database, fetch) {
    const fetchTimeout = require('fetch-timeout')

    app.get("/webImageSample", function (req, res) {
        res.sendFile(path.join(__dirname, '..', 'static', 'files', 'myweb.png'))
    })

    app.get("/resume", function (req, res) {
        res.sendFile(path.join(__dirname, '..', 'static', 'files', 'resume.pdf'))
    })

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

    app.get("*", function (req, res) {
        let address = req.connection.remoteAddress
        const addressList = address.split(":")
        address = addressList.pop()
        fetchTimeout(`http://ip-api.com/json/${address}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }, 1000, 'My custom timeout error string')
            .then(function(res) {
                if (res.status !== 200) {
                    console.log("ERR!")
                } else {
                    return res.json();
                }
            })
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
            .catch(function(err) {
                console.log("error", err);
            })
        res.sendFile(path.join(__dirname, '..', 'static', 'html', 'index.html'))


    })

}