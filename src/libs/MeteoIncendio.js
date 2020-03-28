class MeteoIncendio{
    constructor(zona,fecha,grafico){
        this.zona=zona;
        this.grafico=grafico;
        this.fecha=fecha;
    }

    

    getZona(){
        return this.zona;
    }

    getFecha(){
        return this.fecha;
    }
  

    getGrafico(){
        return this.grafico;
    }
}

module.exports = MeteoIncendio;