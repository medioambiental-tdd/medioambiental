const DB = require('./db');
const db = new DB('data/database.sqlite3');
const MeteoMontaña = require('../libs/MeteoMontaña');

function consultar(zona, predicciones, peticiones, callback){
    db.conn.all('SELECT * FROM prediccion_montaña WHERE nombre=?',[zona],(err,rows)=>{
        var datos;

        if(err)
            throw err;
        else{
            var fecha = new Date().toJSON().slice(0,10);

            if(rows[0]==null || fecha != rows[0].fecha){
                db.conn.all(`SELECT codigo FROM montaña WHERE nombre=?`,[zona],async (err,res)=>{
                    datos = await predicciones.get_prediccion_montaña(zona,res[0].codigo,peticiones.get_datos_api_externa);
                    var fecha = new Date().toJSON().slice(0,10);
                    datos.setNombre(zona);

                    if(rows[0] == null)
                        insertar(datos,callback);
                    else if(fecha != rows[0].fecha)
                        actualizar(datos,callback);
                });
            }
            else{
                var nombre          = rows[0].nombre;
                var estado_cielo    = rows[0].estado_cielo;
                var precipitaciones = rows[0].precipitaciones;
                var tormentas       = rows[0].tormentas;
                var temperaturas    = rows[0].temperaturas;
                var fecha           = rows[0].fecha;
            
                var montaña = new MeteoMontaña(nombre,estado_cielo,precipitaciones,tormentas,temperaturas,fecha);
                return callback(montaña);
            }
        }
    });
}

function consultarTodos(callback){
    db.conn.all('SELECT * FROM prediccion_montaña',(err, rows) => {
            return callback(err,rows);
    });
}

function insertar(datos,callback){
    var nombre = datos.getNombre();
    var estado_cielo = datos.getEstadoCielo();
    var precipitaciones = datos.getPrecipitaciones();
    var tormentas = datos.getTormentas();
    var temperaturas = datos.getTemperaturas();

    db.conn.run(`INSERT INTO prediccion_montaña (nombre,estado_cielo,precipitaciones,tormentas,temperaturas,fecha) 
                VALUES (?,?,?,?,?,date('now'))`,[nombre,estado_cielo,precipitaciones,tormentas,temperaturas],(err) =>{
        if(err)
            throw err;
    })

    return callback(datos);
}

function actualizar(datos,callback){
    db.conn.run(`UPDATE prediccion_montaña SET estado_cielo=?,precipitaciones=?,tormentas=?,temperaturas=?,fecha=? WHERE nombre=?`,[datos.getEstadoCielo(),datos.getPrecipitaciones(),datos.getTormentas(),datos.getTemperaturas(),datos.getFecha(),datos.getNombre()],(err)=>{
        if(err)
            throw err;
    });

    return callback(datos);
}



function eliminar(nombre){
    db.conn.run(`DELETE FROM prediccion_montaña WHERE nombre = ?`,[nombre],(err) =>{
        if(err)
            throw err;
    })
}

module.exports = {
    actualizar,
    insertar,
    eliminar,
    consultar,
    consultarTodos
}