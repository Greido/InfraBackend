const moongose = require('mongoose');
const Schema = moongose.Schema;

const mouseSchema = new Schema({
    nombre:String,
    tipo:String,
    cantidad:String
});

//Modelo
const Mouse = moongose.model('mouse',mouseSchema);

module.exports = Mouse;