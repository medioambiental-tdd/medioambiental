const MeteoTextual = require('../libs/MeteoTextual');

function consultar(zona,callback){
    var hoy = new Date().toJSON().slice(0,10);
    mt = new MeteoTextual('andalucia',hoy,'texto');

    return callback(mt);
}

module.exports = {
    consultar
}