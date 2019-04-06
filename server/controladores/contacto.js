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

/**
 * <GETS>
 */

//GET all
app.get('/contacto', (req, res) => {
	
	Contacto.find({ activo:true }, 'nombre apellido telefono email direccion')
		.sort('nombre')      //orden
		.exec( (err, contactos) => {
			if ( err ) {
				return res.status(400).json({
					ok: false,
					err
				})
			}

			Contacto.count({}, (err, c) => {
				res.json({
					ok:true,
					registros: c,
					contactos
				});
			});


		})

});

// GET con parametro id
app.get('/contacto/:id', (req, res) => {
    
    let id = req.params.id;
    
    Contacto.find({ $and: [{_id:{$eq:id}, activo: { $eq: true } }] },
        'nombre apellido telefono email direccion',
        ( err, contacto ) => {
    
            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            
            res.json({
                ok: true,
                contacto
            })

    })
    
});

// GET Buscar por nombre o telefono
app.get( '/contacto/buscar/:termino', (req, res) => {
    let termino = req.params.termino;
    
    /** Se crea una expresión regular basada en el término y 
     * se le pasa como valor condisional */
    let regex = new RegExp(termino, 'i');
    Contacto.find({
        $and:[{
            $or:[
                { nombre: regex }, 
                { telefono: regex }
            ]}, 
            { activo:true }
        ]},
        'nombre apellido telefono email direccion' )
        .sort('nombre')
        .exec( (err, contactos) => {
            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            
            res.json({
                ok: true,
                contactos
            })
        });
        
});

/**
 * </GETS>
 */




module.exports = app;