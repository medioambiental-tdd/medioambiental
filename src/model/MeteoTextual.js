class MeteoTextual{
    constructor(zona, dia, texto){
        this.zona = zona;
        this.dia = dia;
        this.texto = texto;
    }

    getZona(){
        return this.zona;
    }

    getDia(){
        return this.dia;
    }

    getTexto(){
        return this.texto;
    }
}

module.exports = MeteoTextual;