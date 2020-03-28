const DB = require('./db');
const db = new DB('data/database.sqlite3');
const MeteoIncendio = require('../libs/MeteoIncendio');

function consultar(area,predicciones,peticiones,callback){
    if(area!='península'&&area!='Baleares'&&area!='Canarias'){
         return callback('No existe tal mapa de incendio')
    }else{
        var zona='ninguna';
        switch(area){
            case 'península':
                zona='p';
            break;
    
            case 'Baleares':
                zona='b';
            break;
    
            case 'Canarias':
                zona='c';
            break;
        }
    db.conn.all('SELECT * FROM incendios WHERE  area = ? ',[area],async (err, res) => {
        if (err)
            throw err;
        else{
            var fecha = new Date().toJSON().slice(0,10);
            if(res[0]==null||res[0].fecha != fecha){
                        
                       
                        var datos = await predicciones.get_Riesgo_Incendio(zona,peticiones.get_datosIncendio_api_externa);
                        var fecha = new Date().toJSON().slice(0,10);
        
                        if(res[0]==null)
                            insertar(datos,callback);
                        else
                            actualizar(datos,callback);

            }else{
                 

                 gi= new MeteoIncendio(res[0].area,res[0].fecha,res[0].grafico);
                return callback(gi);
            }
        }
    
        });
    }
}



function actualizar(datos,callback){
   
   
    db.conn.run(`UPDATE incendios SET fecha=?, grafico=? WHERE area=?`,
                                        [datos.getFecha(),datos.getGrafico(),datos.getZona()],(err)=>{
                        if(err)
                            throw err;
                    });

                    gi= new MeteoIncendio(datos.getZona(),datos.getFecha(),datos.getGrafico());
                    return callback(gi);
}

function insertar(datos,callback){
   
    db.conn.run(`INSERT INTO incendios  (area,fecha,grafico) VALUES (?,?,?)`,
                                        [datos.getZona(),datos.getFecha(),datos.getGrafico()],(err)=>{
                        if(err)
                            throw err;
                    });

    gi= new MeteoIncendio(datos.getZona(),datos.getFecha(),datos.getGrafico());
    return callback(gi);
}

function eliminar(zona){
    db.conn.run(`DELETE FROM incendios WHERE area = ?`,[zona],(err) =>{
        if(err)
            throw err;
    })
}

function eliminarDatos(){
    db.conn.run(`DELETE FROM incendios`,(err) =>{
        if(err)
            throw err;
    })
}


module.exports = {
    actualizar,
    consultar,
    eliminar,
    insertar,
    eliminarDatos
   
}