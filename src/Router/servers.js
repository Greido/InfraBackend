const express = require('express');
const router = express.Router();

router.get('/create/server',async(req,res)=>{
    try{
        // Crear una instanacia nueva del modelo server con los datos del cuerpo de la solicitud
        const newServer = new Server(req.body)

        //Guarda el nuevo servidor en la base de datos

        await newServer.save();

        res.status(201).json(newServer);

    }catch(error){ 
        res.status(500).json({error:'Error de base de datos.'})
        console.log(error)
    }
})