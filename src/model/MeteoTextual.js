class MeteoTextual{
    constructor(zona, dia, texto){
        this.zona = zona;
        this.dia = dia;
        this.texto = texto;
    }

    getZona(){
        return this.zona;
    }

    setZona(zona){
        this.zona = zona;
    }

    getDia(){
        return this.dia;
    }

    setDia(dia){
        this.dia = dia;
    }

    getTexto(){
        return this.texto;
    }
}

module.exports = MeteoTextual;