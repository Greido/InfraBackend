//Importo express
const express = require('express');
//Importo morgan

const morgan = require('morgan')


//Inicio el sv express
const app = express();

//Configuro morgan para ver detalladas las peticiones en consola
app.use(morgan('dev'))
//Asi puede aceptar JSON
app.use(express.json())

//Settings de Express
app.set('Gestion infra','Express CRUD')



//Productos

const products = []


//Configuracion de las rutas


app.get('/products',(req,res)=>{
    res.json(products)
})

// Definimos una ruta para manejar solicitudes POST a /products
app.post('/products',(req,res)=>{
    try{
        //Verificamos si se proporcionaron los campos requeridos en el cuerpo
        const {name,price} = req.body;
        if (!name || !price) {
            //Si falta el nombre o el precio, respondemos con un mensaje de error
            return res.status(400).json({error:'Los datos ingresados no son validos'})
        }

        //Creamos un nuevo objeto de producto con los datos del cuerpo de la req
        const newProduct ={
            id: products.length+1,//Asignamos un ID unico que se basa en la cantidad de productos
            name,// Usamos el nombre proporcionado en el cuerpo
            price//Usamos el precio propocionado en el cuerpo
        };

        //Agregamos el producto nuevo a la lista de productos existentes
        products.push(newProduct);
        
        //Respondemos con el nuevo producto en JSON
        res.status(201).json(newProduct);
    } catch(error){

        //En caso de error, mostramos un msj de error en la consola 
        console.log('Error al cargar el producto, intente de nuevo.' + error)
        
        //Respondemos con un msj de error y un estado de error interno del SV
        res.status(500).json({error:'Ocurrio un error en el servidor'})
    }
    
})

// Definimos una ruta para manejar solicitudes GET a /products/:id
app.get('/products/:id',(req,res) => {
    // Obtenemos el valor del parámetro "id" de la URL
    const productId = parseInt(req.params.id);

    // Buscamos un producto en la lista de productos que tenga el mismo ID que el valor obtenido
    const productFound = products.find(product=>product.id === productId);

    // Verificamos si encontramos un producto con el ID proporcionado
    if (productFound) {
        // Si encontramos el producto, lo mostramos en la consola
        console.log(productFound);
        // Respondemos a la solicitud con el producto encontrado en formato JSON
        res.json(productFound);
    } else{
        // Si no encontramos el producto, mostramos un mensaje de error en la consola
        console.log(`El id ${productId} no se encuentra`);
        // Respondemos a la solicitud con un estado de error (código 400) y un mensaje JSON indicando que el producto no fue encontrado
        res.status(400).json({error:'Producto no encontrado'})
    }
    
})

//Definimos una ruta para manejar solicitudes PUT a /products
app.put('/products/:id',(req,res)=>{
    try{
        //Obtenemos el ID del producto a actualizar desde los parámetros de la URL
        const productId = parseInt(req.params.id);

        // Buscamos el índice del producto que coincide con el ID en la lista de productos
        const productFound = products.findIndex(p=>p.id === productId);

        // Verificamos si encontramos el producto para actualizar
        if (productFound !== -1) {
            //Usamos destructuración para obtener los campos a actualizar del cuerpo de la solicitud
            const{name,price} = req.body

            // Verificamos si se proporcionaron los campos requeridos en el cuerpo
            if (!name || !price) {
                return res.status(400).json({error:'Nombre y precio son campos requeridos'})
            }
            
            // Usamos la función map para crear una nueva lista de productos
            const updateProducts = products.map((product,index)=>{
                //si el indice coincide con el indice del producto a actualizar,modificamos los campos
                if (index === productFound) {
                    return{
                        ... product, //Mantenemos los campos existentes del producto
                        name, //Actualizamos el nombre con el nuevo valor
                        price //Actualizamos el precio con el nuevo valor
                    };
                }
                
                return product; //Mantenemos los otros productos sin cambios
            });

            //Reemplazamos la lista de productos con la lista actualizada
            products = updateProducts;

            //Respondemos con un msj indicando que el producto se actualizo con exito

            res.status(200).json({update:'Producto actualizado con exito'});
        } else {
            //Si no encontramos el producto, respondemos con un msj de error
            res.status(404).json({error:'Producto no encontrado para actualizar'})
        }

    }catch (error){
        //En caso de error, mostramos un msj de error en la consola
        console.log('Error al procesar la solicitud PUT' + error);

        //Respondemos con un mensaje de error y un estado de error interno del SV
        res.status(500).json({error:'Ocurrio un error en el servidor :('})
    }
})


// Definimos una ruta para manejar solicitudes DELETE a /products/:id
app.delete('/products/:id',(req,res)=>{

    try{
        // Obtenemos el ID del producto a eliminar desde los parámetros de la URL
        const productId = parseInt(req.params.id);     

        // Buscamos el producto que coincide con el ID en la lista de productos
        const productFound = products.find(product => product.id === productId);

        // Verificamos si encontramos el producto para eliminar
        if (productFound !== -1) {
            // Usamos el método splice para eliminar el producto de la lista
            products.splice(productFound, 1);

            //Mostramos en consola la nueva lista de prods sin el prod eliminado
            console.log(products);

            //Respondemos con un mensaje indicando que el producto se elimino con exito
            res.send('Producto eliminado con exito.');
        } else{
            //Si no encontramos el producto, respondemos con un msj de error 
            res.status(404).json({error:'El producto no se encuentra en stock'})
        }
    } catch (error){
        //En caso de error, mostramos un mensaje de error 
        res.status(400).json({error:'Error al procesar la solicitud de eliminado'})
        
        //Respondemos con un mensaje de error y un estado de error interno del SV
        res.status(500).json({error:'Hubo un error en el servidor'})
    }

});



//El sv se abre en el puerto 4k
const PORT = 4000
app.listen(PORT);
console.log('Server on port'+ PORT);

//Como ver el setting del SV

console.log(`Server ${app.get('Gestion infra')} on port ${PORT}`)