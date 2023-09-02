const moongose = require('mongoose');
const Schema = moongoose.Schema;

const serversSchema = new Schema({
    nombre: String,
    ipPrivada: String,
    ipPublica: String,
    user: String,
    password: String,
});

//Modelo
const Server = moongose.model('server',serversSchema);

module.exports = Server;