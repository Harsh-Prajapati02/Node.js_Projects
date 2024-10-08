// HTTP Module
const http = require("http");

// fs Module
const fs = require("fs");

const server = http.createServer((req, res) => {
    if (req.url == '/home') {
        res.end("<h1>This is Home Page</h1>")
    } else if (req.url == '/about') {
        res.end("<h1>This is About Page</h1>")
    } else if (req.url == '/getproductdata') {

        // fs Module
        fs.readFile("./db.json", 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const { products } = JSON.parse(data)
                res.end(JSON.stringify(products))
            }
        })

    } else if (req.url == '/user') {

        // fs Module
        fs.readFile("./db.json", 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const { user } = JSON.parse(data)
                res.end(JSON.stringify(user))
            }
        })
    }
})

server.listen(8080, () => {
    console.log("Server is running on port 8080.")
})