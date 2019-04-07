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
    
    let options = 'nombre apellido telefono email direccion';    

	Contacto.find( { activo:true }, options )
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
    
    let options = 'nombre apellido telefono email direccion';

    Contacto.find(
        { $and: [{_id:{$eq:id}, activo: { $eq: true } }] },
        options,
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

    let options = 'nombre apellido telefono email direccion';

    Contacto.find({
        $and:[{
            $or:[
                { nombre: regex }, 
                { telefono: regex }
            ]}, 
            { activo:true }
        ]},
        options )
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

 // PUT con parametro id
app.put( '/contacto/:id', ( req, res ) =>{
    let id = req.params.id;
    let body = req.body;
    let newCont = {
        nombre: body.nombre,
        apellido: body.apellido,
        telefono: body.telefono,
        email: body.email,
        direccion: body.direccion
    }
  
    Contacto.findByIdAndUpdate( 
        id, 
        newCont, 
        ( err, contacto ) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            if ( !contacto ){
                return res.status(400).json({
                    ok: false,
                    err:{
                        message: 'No se encontró el id'
                    }
                })
            }
            res.json({
                ok: true,
                contacto
            });		
    } );
});

// DELETE con parametro id
app.delete( '/contacto/:id', ( req, res )=>{
    let id = req.params.id
    let delCont = {
        activo:false
    }

    Contacto.findByIdAndUpdate( 
        id,
        delCont,
        ( err, contacto )=>{
            
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            if ( !contacto ){
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                contacto
            });		

    })
});


module.exports = app;