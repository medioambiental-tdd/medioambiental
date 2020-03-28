const DB = require('./db');
const db = new DB('data/database.sqlite3');
const MeteoPlaya = require('../libs/MeteoPlaya');

function consultar(playa,predicciones,peticiones,callback){
    db.conn.all('SELECT * FROM playas WHERE  nombre = ? ',[playa],(err, res) => {
        if (err)
            throw err;
        else{
            var fecha = new Date().toJSON().slice(0,10);
            if(res[0]==null||res[0].fecha != fecha){
                db.conn.all(`SELECT IDPLAYA FROM codPlayas where NOMBREPLAYA = ? `,[playa],async (err,rows) =>{
                    if(err)
                        throw err;
                    else{
                        if(rows[0]==null)  
                            return callback('No existe tal playa');
                        
                        if(rows[0].IDPLAYA.toString().length<7) rows[0].IDPLAYA='0'+rows[0].IDPLAYA.toString();
                       
                        var datos = await predicciones.get_prediccion_playa(rows[0].IDPLAYA,peticiones.get_datos_api_externa);
                        var fecha = new Date().toJSON().slice(0,10);
        
                        if(res[0]==null)
                            insertar(datos,callback);
                        else
                            actualizar(datos,callback);
                    }
                });
            }else{
                 var nombre  = res[0].nombre;
                 var fecha   = res[0].fecha;
                 var eCielo  = [res[0].e1,res[0].e2];
                 var viento =  [res[0].v1,res[0].v2];
                 var oleaje  = [res[0].o1,res[0].o2];
                 var temp_agua = res[0].ta;
                 var temp_max  = res[0].tm;

                 mp= new MeteoPlaya(nombre,fecha,eCielo,viento,oleaje,temp_agua,temp_max);
                return callback(mp);
            }
        }
    });
}

/*function actualizarDatos(playa,predicciones,peticiones,callback){
    db.conn.all(`SELECT IDPLAYA FROM codPlayas where NOMBREPLAYA = ? `,[playa],async (err,rows) =>{
        if(err)
            throw err;
        else{
            if(rows[0]==null)  
                return callback('No existe tal playa');
                
            if(rows[0].IDPLAYA.toString().length<7){
                var s='0'+rows[0].IDPLAYA.toString();
            }else{
                var s=rows[0].IDPLAYA.toString();
            }
            var datos = await predicciones.get_prediccion_playa(s,peticiones.get_datos_api_externa);
            var fecha = new Date().toJSON().slice(0,10);

            if(rows[0].FECHA != fecha)
                actualizar(datos,callback);
            else
                insertar(datos,callback);
        }
    });
}*/

function actualizar(datos,callback){
    var nombre  = datos.getNombrePlaya();
    var fecha   = datos.getFecha();
    var eCielo  = datos.getEstadoCielo();
    var viento = datos.getViento();
    var oleaje  = datos.getOleaje();
    var temp_agua    = datos.getTempAgua();
    var temp_max   = datos.getTempMax();
   
    db.conn.run(`UPDATE playas SET fecha=?, e1=?,e2=?,v1=?,v2=?,o1=?,o2=?,tm=?,ta=? WHERE nombre=?`,
                                        [fecha,eCielo[0],eCielo[1],viento[0],viento[1],oleaje[0],
                                        oleaje[1],temp_max,temp_agua,nombre],(err)=>{
                        if(err)
                            throw err;
                    });

    mp= new MeteoPlaya(nombre,fecha,eCielo,viento,oleaje,temp_agua,temp_max);
    return callback(mp);
}

function insertar(datos,callback){
    var nombre  = datos.getNombrePlaya();
    var fecha   = datos.getFecha();
    var eCielo  = datos.getEstadoCielo();
    var viento = datos.getViento();
    var oleaje  = datos.getOleaje();
    var temp_agua    = datos.getTempAgua();
    var temp_max   = datos.getTempMax();
   
    db.conn.run(`INSERT INTO playas  (nombre,fecha, e1,e2,v1,v2,o1,o2,tm,ta) VALUES (?,?,?,?,?,?,?,?,?,?)`,
                                        [nombre,fecha,eCielo[0],eCielo[1],viento[0],viento[1],oleaje[0],
                                        oleaje[1],temp_max,temp_agua],(err)=>{
                        if(err)
                            throw err;
                    });

    mp= new MeteoPlaya(nombre,fecha,eCielo,viento,oleaje,temp_agua,temp_max);
    return callback(mp);
}

function eliminar(zona){
    db.conn.run(`DELETE FROM playas WHERE nombre = ?`,[zona],(err) =>{
        if(err)
            throw err;
    })
}


module.exports = {
    actualizar,
    consultar,
    eliminar,
    insertar,
   // actualizarDatos
}