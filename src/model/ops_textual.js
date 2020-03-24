const DB = require('./db');
const db = new DB('data/database.sqlite3');
const MeteoTextual = require('../libs/MeteoTextual');

function consultar(zona, predicciones, peticiones, callback){
    db.conn.all('SELECT * FROM textual WHERE zona=?',[zona],(err, rows) =>{
        var datos;

        if(err)
            throw err;
        else{
            var fecha = new Date().toJSON().slice(0,10);

            if(rows[0]==null || fecha != rows[0].fecha){
                db.conn.all(`SELECT codigo FROM ccaa WHERE nombre=?`,[zona],async (err,res)=>{
                    datos = await predicciones.get_prediccion_textual(res[0].codigo,peticiones.get_datos_api_externa);
                    var fecha = new Date().toJSON().slice(0,10);
                    datos.setZona(zona);

                    if(rows[0] == null)
                        insertar(zona,datos.getTexto(),callback);
                    else if(fecha != rows[0].fecha)
                        actualizar(datos,callback);
                });
            }
            else{
                datos = new MeteoTextual(rows[0].zona, rows[0].fecha, rows[0].texto);

                return callback(datos);
            }
        }
    })
}

function consultarTodos(callback){
    db.conn.all('SELECT zona,texto FROM textual',(err, rows) => {
            return callback(err,rows);
    });
}

function insertar(zona,texto,callback){
    db.conn.run(`INSERT INTO textual (zona,texto,fecha) 
                VALUES (?,?,date('now'))`,[zona,texto],(err) =>{
        if(err)
            throw err;
    })

    var fecha = new Date().toJSON().slice(0,10);
    var mt = new MeteoTextual(zona,fecha,texto);
    return callback(mt);
}

function actualizar(datos,callback){
    db.conn.run(`UPDATE textual SET texto=?, fecha=? WHERE zona=?`,[datos.getTexto(),datos.getDia(),datos.getZona()],(err)=>{
        if(err)
            throw err;
    });

    return callback(datos);
}



function eliminar(zona){
    db.conn.run(`DELETE FROM textual WHERE zona = ?`,[zona],(err) =>{
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