const express = require('express');
const app = express();

const { HandleDocs } = require('./handle')

app.get('/files', HandleDocs.prototype.get_files)
app.get('/textextract-pdf', HandleDocs.prototype.get_text_pdf)

module.exports = app;