const express = require('express');

const app = express();


//Agregar metodos HTTP al servidor express

app.post('/user',(req,res)=>{
    //Como nos envia un json el cliente


    res.send('Nuevo user creado')
})

    


app.get('/isAlive',(req,res)=>{
    res.sendStatus(200)
})


app.listen(4000)
console.log(`server andando en el ${4000}`)