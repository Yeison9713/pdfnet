const express = require('express');
const app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const docs = require("./modules/docs/router")

// const { main } = require("./plugins/database")

app.use(function (req, res, next) {
    // main();
    next();
});

app.get('/', (req, res) => {
    res.json({
        status: true,
        message: 'Active pdfnet'
    })
})

app.use("/docs", docs)

module.exports = app;