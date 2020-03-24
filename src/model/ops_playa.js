const DB = require('./db');
const db = new DB('data/database.sqlite3');
const MeteoPlaya = require('../libs/MeteoPlaya');

function consultar(playa,predicciones,peticiones,callback){
    db.conn.all('SELECT * FROM playas WHERE  nombre = ? ',[playa],(err, rows) => {
        if (err)
            throw err;
        else{
            var fecha = new Date().toJSON().slice(0,10);
            if(rows[0]==null||fecha != rows[0].FECHA){
                actualizarDatos(playa,predicciones,peticiones,callback);
                if(callback=='No existe tal playa')
                    return callback;
            }else{
                var eCielo =[rows[0].e1,rows[0].e2];
                var viento= [rows[0].p1,rows[0].p2];
                var oleaje = [rows[0].c1,rows[0].c2];
                var temp_agua   = rows[0].ta;
                var temp_max  = rows[0].tm;
              

                mp=new MeteoPlaya(rows[0].NOMBRE,rows[0].FECHA,eCielo,viento,oleaje,temp_agua,temp_max);
                return callback(mm);
            }
        }
    });
}

function actualizarDatos(playa,predicciones,peticiones,callback){
    db.conn.all(`SELECT IDPLAYA FROM codPlayas where nombre = ? `,[playa],async (err,rows) =>{
        if(err)
            throw err;
        else{
            if(rows[0]==null)  
                return callback('No existe tal playa');
                
           
            var datos = await predicciones.get_prediccion_municipio(m,peticiones.get_datos_api_externa);
            var fecha = new Date().toJSON().slice(0,10);

            if(rows[0].FECHA != fecha)
                actualizar(datos,callback);
            else
                insertar(datos,callback);
        }
    });
}

function actualizar(datos,callback){
    var nombre  = datos.getNombreMunicipio();
    var fecha   = datos.getFecha();
    var eCielo  = datos.getEstadoCielo();
    var viento = datos.getViento();
    var oleaje  = datos.getOleaje();
    var temp_agua    = datos.getTempAgua();
    var temp_max   = datos.getTempMax();
   
    db.conn.run(`UPDATE playas SET fecha=?, e1=?,e2=?,v1=?,v2=?,o1=?,o2=?,tm=?,ta=? WHERE nombre=?`,
                                        [fecha,eCielo[0],eCielo[1],viento[0],viento[1],oleaje[0],
                                        oleaje[1],temp_agua,temp_max,nombre],(err)=>{
                        if(err)
                            throw err;
                    });

    mp= new MeteoPlaya(nombre,fecha,eCielo,viento,oleaje,temp_agua,temp_max);
    return callback(mp);
}

function insertar(datos,callback){
    var nombre  = datos.getNombreMunicipio();
    var fecha   = datos.getFecha();
    var eCielo  = datos.getEstadoCielo();
    var viento = datos.getViento();
    var oleaje  = datos.getOleaje();
    var temp_agua    = datos.getTempAgua();
    var temp_max   = datos.getTempMax();
   
    db.conn.run(`INSERT INTO playas  (nombre,fecha, e1,e2,v1,v2,o1,o2,tm,ta) VALUES (?,?,?,?,?,?,?,?,?,?)`,
                                        [nombre,fecha,eCielo[0],eCielo[1],viento[0],viento[1],oleaje[0],
                                        oleaje[1],temp_agua,temp_max,nombre],(err)=>{
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
    actualizarDatos
}