const DB = require('./db');
const db = new DB('data/database.sqlite3');
const predicciones  = require('../services/predicciones');
const peticiones = require('../services/peticiones');
const MeteoTextual = require('./MeteoTextual');

function comprobarDatosTextual(){
    db.conn.all('SELECT fecha FROM textual WHERE fecha = (SELECT MIN(fecha) FROM textual)',(err, rows) => {
        if (err) 
            throw err;
        else{
            var fecha = new Date().toJSON().slice(0,10);

            if(fecha != rows[0].fecha){
                actualizarDatosTextual();
            }
        }
    });
}

function actualizarDatosTextual(){
    db.conn.run(`DELETE FROM textual`,(err) =>{
        if(err)
            throw err;
        else{
            db.conn.all(`SELECT codigo,nombre FROM ccaa`,(err,rows) =>{
                if(err)
                    throw err;
                else{
                    rows.forEach( async (row) => {
                        var datos = await predicciones.get_prediccion_textual(row.codigo,peticiones.get_datos_api_externa);
                        insertarDatosTextual(row.nombre,datos.getTexto());
                    });
                }
            });
        }
    });
}

function insertarDatosTextual(zona,texto){
    db.conn.run(`INSERT INTO textual (zona,texto,fecha) 
                VALUES (?,?,date('now'))`,[zona,texto],(err) =>{
        if(err)
            throw err;
    })
}

function eliminarDatosTextual(zona){
    db.conn.run(`DELETE FROM textual WHERE zona = ?`,[zona],(err) =>{
        if(err)
            throw err;
    })
}

function getDatoTextual(zona, callback){
    db.conn.all('SELECT * FROM textual WHERE zona= ?',[zona],(err, rows) =>{
        if(err)
            throw err;
        else{
            mt = new MeteoTextual(rows[0].zona, rows[0].fecha, rows[0].texto);

            return callback(mt);
        }
    })
}

function obtenerDatosTextual(callback){
    db.conn.all('SELECT zona,texto FROM textual',(err, rows) => {
        if (err) 
            throw err;
        else
            return callback(rows);
    });
}

function getDatoMunicipio(municipio,callback){
    db.conn.all('SELECT * FROM municipios WHERE nombreMunicipio= ?',[municipio],(err, rows) =>{
        if (err) 
        throw err;
    else
    mm = new MeteoMunicipio(rows[0].nombreMunicipio, rows[0].fecha, rows[0].estadoCielo, rows[0].probPrecipitacion, rows[0].probNieve, rows[0].temperatura, rows[0].sensacionTermica, rows[0].VelocidadViento, rows[0].direccionViento, rows[0].amanecer, rows[0].ocaso);

        return callback(mm);
});
}

function comprobarDatosMunicipio(){
    db.conn.all('SELECT fecha FROM municipios WHERE fecha = (SELECT MIN(fecha) FROM municipios)',(err, rows) => {
        if (err) 
            throw err;
        else{
            var fecha = new Date().toJSON().slice(0,10);

            if(fecha != rows[0].fecha){
                actualizarDatosMunicipios();
            }
        }
    });
}

function actualizarDatosMunicipio(){
    db.conn.run(`DELETE FROM municipios`,(err) =>{
        if(err)
            throw err;
        else{
            db.conn.all(`SELECT CPRO,CMUN FROM codMunicipios`,(err,rows) =>{
                if(err)
                    throw err;
                else{
                    rows.forEach( async (row) => {
                        var datos = await predicciones.get_prediccion_textual(row.codigo,peticiones.get_datos_api_externa);
                        insertarDatosTextual(row.nombre,datos.getTexto());
                    });
                }
            });
        }
    });
}

module.exports = {
    comprobarDatosTextual,
    actualizarDatosTextual,
    obtenerDatosTextual,
    insertarDatosTextual,
    eliminarDatosTextual,
    getDatoTextual
}