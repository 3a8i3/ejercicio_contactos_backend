require('./config/config.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// para las rutas del proyecto
const path = require('path');

const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors())

// configuración de body parse
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded( { extended: false } ));

// parse application/json
app.use( bodyParser.json() );

// habilita la carpeta public
app.use( express.static( path.resolve( __dirname , "../public" ) ) );

// usar la configuracion de controladores/index.js
app.use( require('./controladores/index') );


/* ####### Conexion a db ####### */
mongoose.connect(
  process.env.URLDB,
  // se le pasa estas configuaraciones para evitar warnings
  // al ejebutar el servidor
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    'useCreateIndex': true
  },
  (err, res) => {
    if ( err ) { throw err; }

    console.log('Base de datos online');

  }
);


// activa el server
app.listen(process.env.PORT,()=>{
	console.log('Escuchando el puerto ', process.env.PORT);
})
