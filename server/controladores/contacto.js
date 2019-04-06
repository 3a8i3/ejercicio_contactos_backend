const express = require('express');
const Contacto = require('../model/contacto');
const _ = require('underscore');

const app= express();



//POST
app.post('/contacto', (req, res) => {

	//contenido enviado por post
	let body = req.body;

	let contacto = new Contacto({
        nombre:body.nombre,
        apellido: body.apellido,
        telefono: body.telefono,
		email:body.email,
		direccion:body.direccion
	});

	contacto.save( (err,contactoDB) => {
        
        if ( err ) {
			return res.status(400).json({
				ok: false,
				err
			})
		} 

		res.json({
			ok:true,
			contacto: contactoDB
		});

	});

});




module.exports = app;