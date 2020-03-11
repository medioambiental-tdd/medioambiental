const predicciones  = require('../services/predicciones');

class MeteoTextual{
    constructor(zona, dia){
        this.zona = zona;
        this.dia = dia;

        this.pedirDatosTextual();
    }

    pedirDatosTextual(){
        (async () => {
            this.texto = await predicciones(this.zona,this.dia);
        })()
    }
}

mt = new MeteoTextual("nacional","hoy");