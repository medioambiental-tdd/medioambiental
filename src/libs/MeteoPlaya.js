class MeteoPlaya{
    constructor(nombrePlaya,fecha,estado_cielo,viento,oleaje,temp_agua,temp_max){
        this.nombrePlaya=nombrePlaya;
        this.codigo=codigo;
        this.estado_cielo=estado_cielo;
        this.viento=viento;
        this.oleaje=oleaje;
        this.temp_max=temp_max;
        this.temp_agua=temp_agua;
        this.fecha=fecha;
    }

    getNombrePlaya(){
        return this.nombrePlaya;
    }

    getProvincia(){
        return this.provincia;
    }

    getFecha(){
        return this.fecha;
    }
    
    getEstadoCielo(){
        return this.estado_cielo;
    }

    getViento(){
        return this.viento;
    }

    getOleaje(){
        return this.oleaje
    }

    getTempAgua(){
        return this.temp_agua
    }

    getTempMax(){
        return this.temp_max;
    }



   
}

module.exports = MeteoPlaya;