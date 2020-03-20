const MeteoTextual = require('../model/MeteoTextual');
const MeteoMunicipio = require('../model/MeteoMunicipio');

function getDatoTextual(zona,callback){
    var hoy = new Date().toJSON().slice(0,10);
    mt = new MeteoTextual('andalucia',hoy,'texto');

    return callback(mt);
}

function getDatoMunicipio(municipio,callback){
    if(municipio=="Granada"){
        var hoy=new Date().toJSON().slice(0,10);
        var nombre="Granada";
        var e=["nuboso","nuboso","nuboso","nuboso"];
        var pp=[0,10,20,30];
        var pn=[2000,1000,2000,1000];
        var t=[9,9,6,6];
        var s=[12,12,9,9]
        var v=[5,5,5,5];
        var d=["E","E","E","E"];
        mm=new MeteoMunicipio(nombre,hoy,e,pp,pn,t,s,v,d);
    }else{
        mm="No existe tal municipio";
    }

    return callback(mm);
}
module.exports = {
    getDatoTextual,
    getDatoMunicipio
}