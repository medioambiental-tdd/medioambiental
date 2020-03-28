const MeteoIncendio = require('../libs/MeteoIncendio');

function consultar(area,callback){
    if(area=='Canarias'){
        var hoy=new Date().toJSON().slice(0,10);
        var nombre="Canarias";
        var grafico='<html><img src="https://opendata.aemet.es/opendata/sh/88ff3ad8"></html>';
        gi=new MeteoIncendio(nombre,hoy,grafico);
    }else{
        gi="No existe tal mapa de incendio";
    }

    return callback(gi);
}

module.exports = {
    consultar
}