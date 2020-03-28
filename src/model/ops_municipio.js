const DB = require('./db');
const db = new DB('data/database.sqlite3');
const MeteoMunicipio = require('../libs/MeteoMunicipio');

function consultar(municipio,predicciones,peticiones,callback){
    db.conn.all('SELECT * FROM municipios WHERE  nombre = ? ',[municipio],(err, rows) => {
        if (err)
            throw err;
        else{
            var fecha = new Date().toJSON().slice(0,10);
            if(rows[0]==null||fecha != rows[0].FECHA){
                db.conn.all(`SELECT CPRO,CMUN FROM codMunicipios where nombre = ?`,[municipio],async (err,res)=>{
                    if(err)
                        throw err;
                    else{
                        if(res[0]==null)
                            return callback('No existe tal municipio');

                        var m=res[0].CPRO*1000+res[0].CMUN;
                        var datos = await predicciones.get_prediccion_municipio(m,peticiones.get_datos_api_externa);
                        var fecha = new Date().toJSON().slice(0,10);
            
                        if(rows[0] == null)
                            insertar(datos,callback);
                        else
                            actualizar(datos,callback);
                    }
                });
            }else{
                var eCielo = [rows[0].e1,rows[0].e2,rows[0].e3,rows[0].e4];
                var pPrecip= [rows[0].p1,rows[0].p2,rows[0].p3,rows[0].p4];
                var cNieve = [rows[0].c1,rows[0].c2,rows[0].c3,rows[0].c4];
                var temp   = [rows[0].t1,rows[0].t2,rows[0].t3,rows[0].t4];
                var sensT  = [rows[0].s1,rows[0].s2,rows[0].s3,rows[0].s4];
                var vViento= [rows[0].v1,rows[0].v2,rows[0].v3,rows[0].v4];
                var dViento= [rows[0].d1,rows[0].d2,rows[0].d3,rows[0].d4];

                mm=new MeteoMunicipio(rows[0].NOMBRE,rows[0].FECHA,eCielo,pPrecip,cNieve,temp,sensT,vViento,dViento);
                return callback(mm);
            }
        }
    });
}

function actualizar(datos,callback){
    var nombre  = datos.getNombreMunicipio();
    var fecha   = datos.getFecha();
    var eCielo  = datos.getEstadoCielo();
    var pPrecip = datos.getProbPrecipitacion();
    var cNieve  = datos.getCotaNieve();
    var temp    = datos.getTemperatura();
    var sensT   = datos.getSensacionTermica();
    var vViento = datos.getVelocidadViento();
    var dViento = datos.getDireccionViento();
    
    db.conn.run(`UPDATE municipios SET fecha=?, e1=?,e2=?,e3=?,e4=?,p1=?,p2=?,p3=?,p4=?,c1=?,c2=?,c3=?,c4=?,t1=?,
                                        t2=?,t3=?,t4=?,s1=?,s2=?,s3=?,s4=?,v1=?,v2=?,v3=?,v4=?,d1=?,d2=?,d3=?,d4=? WHERE nombre=?`,
                                        [fecha,eCielo[0],eCielo[1],eCielo[2],eCielo[3],pPrecip[0],
                                        pPrecip[1],pPrecip[2],pPrecip[3],cNieve[0],cNieve[1],cNieve[2],
                                        cNieve[3],temp[0],temp[1],temp[2],temp[3],sensT[0],
                                        sensT[1],sensT[2],sensT[3],vViento[0],vViento[1],vViento[2]
                                        ,vViento[3],dViento[0],dViento[1],dViento[2],dViento[3],nombre],(err)=>{
                        if(err)
                            throw err;
                    });

    mm= new MeteoMunicipio(nombre,fecha,eCielo,pPrecip,cNieve,temp,sensT,vViento,dViento);
    return callback(mm);
}

function insertar(datos,callback){
    var nombre  = datos.getNombreMunicipio();
    var fecha   = datos.getFecha();
    var eCielo  = datos.getEstadoCielo();
    var pPrecip = datos.getProbPrecipitacion();
    var cNieve  = datos.getCotaNieve();
    var temp    = datos.getTemperatura();
    var sensT   = datos.getSensacionTermica();
    var vViento = datos.getVelocidadViento();
    var dViento = datos.getDireccionViento();
    
    db.conn.run(`INSERT INTO municipios (nombre,fecha,e1,e2,e3,e4,p1,p2,p3,p4,c1,c2,c3,c4,t1,
                                                t2,t3,t4,s1,s2,s3,s4,v1,v2,v3,v4,d1,d2,d3,d4) 
                        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
                    ,[nombre,fecha,eCielo[0],eCielo[1],eCielo[2],eCielo[3],pPrecip[0],
                    pPrecip[1],pPrecip[2],pPrecip[3],cNieve[0],cNieve[1],cNieve[2],
                    cNieve[3],temp[0],temp[1],temp[2],temp[3],sensT[0],
                    sensT[1],sensT[2],sensT[3],vViento[0],vViento[1],vViento[2]
                    ,vViento[3],dViento[0],dViento[1],dViento[2],dViento[3]],(err) =>{
        if(err)
            throw err;
    });

    var mm= new MeteoMunicipio(nombre,fecha,eCielo,pPrecip,cNieve,temp,sensT,vViento,dViento);
    return callback(mm);
}

function eliminar(zona){
    db.conn.run(`DELETE FROM municipios WHERE nombre = ?`,[zona],(err) =>{
        if(err)
            throw err;
    })
}


module.exports = {
    actualizar,
    consultar,
    eliminar,
    insertar,
}