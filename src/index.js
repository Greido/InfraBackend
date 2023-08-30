const express = require('express');

const app = express();


app.get('/products',(req,res)=>{
    res.send('Lista de productos')
})


app.listen(4000)
console.log(`server andando en el ${4000}`)