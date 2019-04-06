const express = require('express');
const app = express();

// usa controlador de contacto
app.use( require('./contacto') );


module.exports = app;