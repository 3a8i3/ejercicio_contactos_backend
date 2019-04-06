require('./config/config.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

// configuración de body parse
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded( { extended: false } ));

// parse application/json
app.use( bodyParser.json() );

// usar la configuracion de controladores/index.js
app.use( require('./controladores/index') );


/* ####### Conexion a db ####### */
mongoose.connect(process.env.URLDB, (err, res) => {
	if ( err ) { throw err; }

	console.log('Base de datos online');

});


// activa el server
app.listen(process.env.PORT,()=>{
	console.log('Escuchando el puerto ', process.env.PORT);
})