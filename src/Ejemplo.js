/* //Http sin express

const http = require('http')

const fs = require('fs')

const server = http.createServer((req,res)=>{
    //Puedo devolver un texo si quiero pero lo mas normal es devolver un html
    const read = fs.createReadStream('src/static/index.html')  

    read.pipe(res)

})


server.listen(3000)
console.log(`server on port ${3000}`) */


/* EL CODIGO DE ARRIBA ESTA COMENTADO DEBIDO A QUE ES SOLO NODE, DEJARE SIN COMENTAR
EL CODIGO CREADO CON EXPRESS :D
 */


/* 
    Usando el modulo de node hemos creado esta app sencilla
    que lee un archivo html y se lo envia al cliente.
    Esto de aqui se puede resumir mucho mas si usamos express, cuando
    nuestro proyecto vaya creciendo, necesite leer mas rutas, leer otros tipos de 
    archivos, enviar otro tipo de respuesta, si usamos solo node, vamos a tener que hacer
    .todo eso desde cero, pero si usamos express lo podemos resumir en unas cuantas funciones,
    ya que express te da esas funciones echas, en lugar de vos crear todo desde 0

*/


//Con express debemos importarlo, decirle que vamos a requerirlo

/* const express = require('express');

const app = express() //Aqui ya estamos creando el servidor

//Para enviar el archivo realizamos lo siguiente

app.get('/',(req,res)=>{
    res.sendFile('./static/index.html',{
        root:__dirname
    })
})

app.listen(3000);

console.log('Server on port 3000') */