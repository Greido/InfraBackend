const express = require('express');
const router = express.Router();
//Hay que exportar el modelo del server
const Server = require('../models/servers')


router.post('/create/server',async(req,res)=>{
    try{
        // Crear una instanacia nueva del modelo server con los datos del cuerpo de la solicitud
        const newServerData = {
            nombre:req.body.nombre,
            ipPrivada:req.body.ipPrivada,
            ipPublica:req.body.ipPublica,
            user:req.body.user,
            password:req.body.password,
        };

        const newServer = new Server(newServerData);
        //Guarda el nuevo servidor en la base de datos

        await newServer.save();

        res.status(201).json(newServer);

    }catch(error){ 
        res.status(500).json({error:'Error de base de datos.'})
        console.log(error)
    }
})

module.exports = router; //Siempre hay que exportar el router al final de un archivo :D