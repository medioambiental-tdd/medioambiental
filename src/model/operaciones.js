const DB = require('./db');
const db = new DB('data/database.sqlite3');
const predicciones  = require('../services/predicciones');

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
                        var datos = await predicciones.get_prediccion_textual(row.codigo);
                        insertarDatosTextual(row.nombre,datos);
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


function obtenerDatosTextual(callback){
    db.conn.all('SELECT zona,texto FROM textual',(err, rows) => {
        if (err) 
            throw err;
        else
            return callback(rows);
    });
}

module.exports = {
    comprobarDatosTextual,
    actualizarDatosTextual,
    obtenerDatosTextual,
    insertarDatosTextual,
    eliminarDatosTextual
}