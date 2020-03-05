function prediccion_meteo(municipio, dia){
    var json = {
        "municipio" : "Granada",
        "estado_cielo": "nublado",
        "prob_precipitacion" : "13",
        "prob_nieve" : "0",
        "temperatura" : "17",
        "sensacion_termica" : "15",
        "velocidad_viento":"5",
        "direccion_viento":"WE",
        "amanecer":"7",
        "ocaso":"20"
    };

    return json;
}

function prediccion_meteo_textual(zona,dia){
    var json = {
        "zona" : "Granada",
        "prediccion": "texto"
    };

    return json;

}