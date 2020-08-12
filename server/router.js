module.exports = function (app, path) {
    app.get("/webImageSample", function (req, res) {
        res.sendFile(path.join(__dirname, '..', 'static', 'files', 'myweb.png'))
    })

    app.get("/resume", function (req, res) {
        res.sendFile(path.join(__dirname, '..', 'static', 'files', 'resume.pdf'))
    })

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, '..', 'static', 'html', 'index.html'))
    })
}