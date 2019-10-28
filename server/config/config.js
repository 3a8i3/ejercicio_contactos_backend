// Puerto
process.env.PORT = process.env.PORT || 8080;

/**
 * Configuración del entorno
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * Configuración de la base de datos
 */

let urlDB;

if (process.env.NODE_ENV === 'dev') {

	urlDB = 'mongodb://localhost:27017/taller3-contacto-db';
	
} else {

	urlDB = process.env.DB_URI;
	
}

process.env.URLDB = urlDB;

