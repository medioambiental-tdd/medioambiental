const MeteoPlaya = require('../libs/MeteoPlaya');

function consultar(Playa,callback){
    if(Playa=="Calahonda"){
        var hoy=new Date().toJSON().slice(0,10);
        var nombre="Calahonda";
        var e=["nuboso","nuboso"];
        var viento=["flojo","flojo"];
        var oleaje=["moderado","moderado"];
        var ta=15;
        var tm=19;
        mp=new MeteoPlaya(nombre,hoy,e,viento,oleaje,ta,tm);
    }else{
        mp="No existe tal playa";
    }

    return callback(mp);
}

module.exports = {
    consultar
}