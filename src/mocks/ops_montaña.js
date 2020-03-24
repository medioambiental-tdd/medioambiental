const MeteoMontaña = require('../libs/MeteoMontaña');

function consultar(zona,callback){
    var nombre          = "monte_test"
    var estado_cielo    = "Intervalos nubosos.";
    var precipitaciones = "Podrán caer algunos chubascos vespertinos.";
    var tormentas       = "No se descarta alguna ocasional.";
    var temperaturas    = "Mínimas sin cambios o en ligero descenso.";
    var fecha           = new Date().toJSON().slice(0,10);

    var montaña = new MeteoMontaña(nombre,estado_cielo,precipitaciones,tormentas,temperaturas,fecha);
    return callback(montaña);
}

module.exports = {
    consultar
}