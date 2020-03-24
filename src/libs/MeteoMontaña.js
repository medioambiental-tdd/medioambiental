class MeteoMontaña{
    constructor(nombre,estado_cielo, precipitaciones, tormentas, temperaturas,fecha){
        this.nombre          = nombre;
        this.estado_cielo    = estado_cielo;
        this.precipitaciones = precipitaciones;
        this.tormentas       = tormentas;
        this.temperaturas    = temperaturas;
        this.fecha           = fecha;
    }

    setNombre(nombre){
        this.nombre = nombre;
    }

    getNombre(){
        return this.nombre;
    }

    getEstadoCielo(){
        return this.estado_cielo;
    }

    getPrecipitaciones(){
        return this.precipitaciones;
    }

    getTormentas(){
        return this.tormentas;
    }

    getTemperaturas(){
        return this.temperaturas;
    }

    setFecha(fecha){
        this.fecha = fecha;
    }

    getFecha(){
        return this.fecha;
    }
}

module.exports = MeteoMontaña;