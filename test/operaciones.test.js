const ops_municipio  = require('../src/model/ops_municipio');
const ops_textual    = require('../src/model/ops_textual'); 
const ops_montaña    = require('../src/model/ops_montaña');
const ops_playa    = require('../src/model/ops_playa');
const ops_incendio    = require('../src/model/ops_incendio');
const predicciones   = require('../src/services/predicciones');
const peticiones     = require('../src/mocks/peticiones');
const MeteoTextual   = require('../src/libs/MeteoTextual');
const MeteoMunicipio = require ('../src/libs/MeteoMunicipio');
const MeteoMontaña   = require ('../src/libs/MeteoMontaña');
const MeteoPlaya   = require ('../src/libs/MeteoPlaya');
const MeteoIncendio      = require('../src/libs/MeteoIncendio');
const chai           = require('chai');
const expect         = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);


describe('Tests para operaciones con textual', function(){
    it('Debería cargar la biblioteca de operaciones con textual y poder instanciarse',function(){
        expect(ops_textual).to.exist
    });

    it('Debería poder consultar todos los datos textuales', function(done){
        ops_textual.consultarTodos(function(err,tabla){
            if(err) done(err);
            else
                done();

            expect(tabla[0]).to.have.all.keys('zona', 'texto');
        });
    });

    it('Debería poder insertar datos textuales por ccaa', function(done){
        expect(ops_textual.consultar('gotham',predicciones,peticiones,function(mt){

            expect(mt).to.be.an.instanceof(MeteoTextual);

            var hoy = new Date().toJSON().slice(0,10);
            expect(mt).to.be.an.instanceof(MeteoTextual);
            expect(mt.getZona()).to.equal('gotham');
            expect(mt.getDia()).to.equal(hoy);
            expect(mt.getTexto()).to.be.a('string');
            done();
        })).to.not.throw;
    });

    it('Debería poder consultar datos textuales por ccaa', function(done){
        expect(ops_textual.consultar('gotham',predicciones,peticiones,function(mt){

            expect(mt).to.be.an.instanceof(MeteoTextual);

            var hoy = new Date().toJSON().slice(0,10);
            expect(mt).to.be.an.instanceof(MeteoTextual);
            expect(mt.getZona()).to.equal('gotham');
            expect(mt.getDia()).to.equal(hoy);
            expect(mt.getTexto()).to.be.a('string');
            done();
        })).to.not.throw;
    });

    it('Debería poder actualizar datos textuales por ccaa', function(done){
        var datos = {
            status: 200,
            statusText: 'OK',
            text() { return 'Dia chungo en Gotham hoy. Se recomienda no salir al exterior.'; }
        };
        var date = new Date();
        date.setDate(date.getDate() - 1);
        date = date.toJSON().slice(0,10);

        var mt1 = new MeteoTextual('gotham',date,datos.text());

        ops_textual.actualizar(mt1,function(mt2){                
            expect(mt2).to.be.an.instanceof(MeteoTextual);
            expect(mt2.getZona()).to.equal('gotham');
            expect(mt2.getDia()).to.equal(date);
            expect(mt2.getTexto()).to.be.a('string');

            done();
        });
    });

    it('Debería poder consultar datos textuales por ccaa', function(done){
        expect(ops_textual.consultar('gotham',predicciones,peticiones,function(mt){

            expect(mt).to.be.an.instanceof(MeteoTextual);

            var hoy = new Date().toJSON().slice(0,10);
            expect(mt).to.be.an.instanceof(MeteoTextual);
            expect(mt.getZona()).to.equal('gotham');
            expect(mt.getDia()).to.equal(hoy);
            expect(mt.getTexto()).to.be.a('string');
            done();
        })).to.not.throw;
    });

    it('Debería poder eliminar datos de montaña', function(done){
        expect(ops_textual.eliminar('gotham')).to.not.throw;
        done();
    });
});

describe('Tests para operaciones con municipios', function(){
    it('Debería cargar la biblioteca de operaciones con municipios y poder instanciarse',function(){
        expect(ops_municipio).to.exist
    });


    it('Debería poder actualizar los datos de un municipio', function(done){
        ops_municipio.actualizarDatos('Sevilla',predicciones,peticiones,function(mm){
            expect(mm).to.be.an.instanceof(MeteoMunicipio);
            done();
        });
    });

    it('Debería poder comprobar datos de municipio', function(done){
        expect(ops_municipio.consultar('Granada',predicciones,peticiones,function(mm){

            var hoy = new Date().toJSON().slice(0,10);            
            expect(mm).to.be.an.instanceOf(MeteoMunicipio);
            expect(mm.getNombreMunicipio()).to.equal("Granada");
            expect(mm.getFecha()).to.equal(hoy);
            expect(mm.getEstadoCielo()).to.have.lengthOf(4);
            expect(mm.getProbPrecipitacion()).to.have.lengthOf(4);
            expect(mm.getCotaNieve()).to.have.lengthOf(4);
            expect(mm.getTemperatura()).to.have.lengthOf(4);
            expect(mm.getSensacionTermica()).to.have.lengthOf(4);
            expect(mm.getVelocidadViento()).to.have.lengthOf(4);
            expect(mm.getDireccionViento()).to.have.lengthOf(4);

            done();
        })).to.not.throw;
    });

    it('Debería poder comprobar datos de municipio', function(done){
        expect(ops_municipio.consultar('Granada',predicciones,peticiones,function(mm){
            var hoy = new Date().toJSON().slice(0,10);            
            expect(mm).to.be.an.instanceOf(MeteoMunicipio);
            expect(mm.getNombreMunicipio()).to.equal("Granada");
            expect(mm.getFecha()).to.equal(hoy);
            expect(mm.getEstadoCielo()).to.have.lengthOf(4);
            expect(mm.getProbPrecipitacion()).to.have.lengthOf(4);
            expect(mm.getCotaNieve()).to.have.lengthOf(4);
            expect(mm.getTemperatura()).to.have.lengthOf(4);
            expect(mm.getSensacionTermica()).to.have.lengthOf(4);
            expect(mm.getVelocidadViento()).to.have.lengthOf(4);
            expect(mm.getDireccionViento()).to.have.lengthOf(4);

            done();
        })).to.not.throw;
    });


    it('Debería poder insertar un municipio',async function(){
        ops_municipio.eliminar('Granada');


        var datos = await predicciones.get_prediccion_municipio('Granada',peticiones.get_datos_api_externa);
        ops_municipio.insertar(datos,function(mm){

            var hoy = new Date().toJSON().slice(0,10);            
            expect(mm).to.be.an.instanceOf(MeteoMunicipio);
            expect(mm.getNombreMunicipio()).to.equal("Granada");
            expect(mm.getFecha()).to.equal(hoy);
            expect(mm.getEstadoCielo()).to.have.lengthOf(4);
            expect(mm.getProbPrecipitacion()).to.have.lengthOf(4);
            expect(mm.getCotaNieve()).to.have.lengthOf(4);
            expect(mm.getTemperatura()).to.have.lengthOf(4);
            expect(mm.getSensacionTermica()).to.have.lengthOf(4);
            expect(mm.getVelocidadViento()).to.have.lengthOf(4);
            expect(mm.getDireccionViento()).to.have.lengthOf(4);

        });

        ops_municipio.eliminar('Granada');
        var datos = await predicciones.get_prediccion_municipio('Granada',peticiones.get_datos_api_externa);
    });

    it('Debería indicar que un municipio no existe',function(done){
        ops_municipio.consultar('Arkham',predicciones,peticiones,function(mm){
            expect(mm).to.equal('No existe tal municipio');
            done();
        });
    });
});

describe('Tests para operaciones con montañas', function(){
    it('Debería cargar la biblioteca de operaciones de montaña y poder instanciarse',function(){
        expect(ops_montaña).to.exist
    });

    it('Debería poder consultar todos los datos de montaña', function(done){
        ops_montaña.consultarTodos(function(err,tabla){
            if(err) done(err);
            else
                done();

            expect(tabla[0]).to.have.all.keys('nombre', 'estado_cielo','precipitaciones','tormentas','temperaturas','fecha');
        });
    });

    it('Debería poder insertar datos de montaña', function(done){
        ops_montaña.consultar('monte_test',predicciones,peticiones,function(res){
            var hoy = new Date().toJSON().slice(0,10);
            expect(res).to.be.an.instanceof(MeteoMontaña);
            expect(res.getNombre()).to.equal('monte_test');
            expect(res.getEstadoCielo()).to.equal('Intervalos nubosos.');
            expect(res.getPrecipitaciones()).to.equal('Podrán caer algunos chubascos vespertinos.');
            expect(res.getTormentas()).to.equal('No se descarta alguna ocasional.');
            expect(res.getTemperaturas()).to.equal('Mínimas sin cambios o en ligero descenso.');
            expect(res.getFecha()).to.equal(hoy);

            done();
        });
    });

    it('Debería poder consultar datos de montaña', function(done){
        ops_montaña.consultar('monte_test',predicciones,peticiones,function(res){
            var hoy = new Date().toJSON().slice(0,10);
            expect(res).to.be.an.instanceof(MeteoMontaña);
            expect(res.getNombre()).to.equal('monte_test');
            expect(res.getEstadoCielo()).to.equal('Intervalos nubosos.');
            expect(res.getPrecipitaciones()).to.equal('Podrán caer algunos chubascos vespertinos.');
            expect(res.getTormentas()).to.equal('No se descarta alguna ocasional.');
            expect(res.getTemperaturas()).to.equal('Mínimas sin cambios o en ligero descenso.');
            expect(res.getFecha()).to.equal(hoy);

            done();
        });
    });

    it('Debería poder actualizar datos de montaña', function(done){
        var nombre          = "monte_test"
        var estado_cielo    = "Intervalos nubosos.";
        var precipitaciones = "Podrán caer algunos chubascos vespertinos.";
        var tormentas       = "No se descarta alguna ocasional.";
        var temperaturas    = "Mínimas sin cambios o en ligero descenso.";
        var fecha           = new Date();
        fecha.setDate(fecha.getDate() - 1);
        fecha = fecha.toJSON().slice(0,10);

        var montaña = new MeteoMontaña(nombre,estado_cielo,precipitaciones,tormentas,temperaturas,fecha);    

        ops_montaña.actualizar(montaña,function(res){
            expect(res).to.be.an.instanceof(MeteoMontaña);
            expect(res.getFecha()).to.equal(fecha);

            done();
        });
    });

    it('Debería poder consultar datos de montaña', function(done){
        ops_montaña.consultar('monte_test',predicciones,peticiones,function(res){            
            expect(res).to.be.an.instanceof(MeteoMontaña);
            expect(res.getNombre()).to.equal('monte_test');
            expect(res.getEstadoCielo()).to.equal('Intervalos nubosos.');
            expect(res.getPrecipitaciones()).to.equal('Podrán caer algunos chubascos vespertinos.');
            expect(res.getTormentas()).to.equal('No se descarta alguna ocasional.');
            expect(res.getTemperaturas()).to.equal('Mínimas sin cambios o en ligero descenso.');

            done();
        });
    });


    it('Debería poder eliminar datos de montaña', function(done){
        expect(ops_montaña.eliminar('monte_test')).to.not.throw;
        done();
    });
});
    describe('Tests para operaciones con playas', function(){
        it('Debería cargar la biblioteca de operaciones con playas y poder instanciarse',function(){
            expect(ops_playa).to.exist
        });

        it('Debería poder insertar datos de playa', function(done){
            ops_playa.consultar('Calahonda',predicciones,peticiones,function(res){
                var hoy = new Date().toJSON().slice(0,10);
                expect(res).to.be.an.instanceof(MeteoPlaya);
                expect(res.getNombrePlaya()).to.equal('Calahonda');
                expect(res.getEstadoCielo()).to.have.lengthOf(2);
                expect(res.getViento()).to.have.lengthOf(2);
                expect(res.getOleaje()).to.have.lengthOf(2);
                expect(res.getTempAgua()).to.equal(15);
                expect(res.getTempMax()).to.equal(19);
                expect(res.getFecha()).to.equal(hoy);
    
                done();
            });
        });

        it('Debería poder consultar datos de playa', function(done){
            ops_playa.consultar('Calahonda',predicciones,peticiones,function(res){
                var hoy = new Date().toJSON().slice(0,10);
                expect(res).to.be.an.instanceof(MeteoPlaya);
                expect(res.getNombrePlaya()).to.equal('Calahonda');
                expect(res.getEstadoCielo()).to.have.lengthOf(2);
                expect(res.getViento()).to.have.lengthOf(2);
                expect(res.getOleaje()).to.have.lengthOf(2);
                expect(res.getTempAgua()).to.equal(15);
                expect(res.getTempMax()).to.equal(19);
                expect(res.getFecha()).to.equal(hoy);
    
                done();
            });
        });

        it('Debería poder actualizar datos de playa', function(done){
            var fecha=new Date();
            var nombre="Calahonda";
            var e=["nuboso","nuboso"];
            var viento=["flojo","flojo"];
            var oleaje=["moderado","moderado"];
            var ta=15;
            var tm=19;
            fecha.setDate(fecha.getDate() - 1);
            fecha = fecha.toJSON().slice(0,10);
           var  mp=new MeteoPlaya(nombre,fecha,e,viento,oleaje,ta,tm);
    
            ops_playa.actualizar(mp,function(res){
                expect(res).to.be.an.instanceof(MeteoPlaya);
                expect(res.getFecha()).to.equal(fecha);
    
                done();
            });
        });
    
        it('Debería poder consultar datos de playa', function(done){
            ops_playa.consultar('Calahonda',predicciones,peticiones,function(res){
                var hoy = new Date().toJSON().slice(0,10);
                expect(res).to.be.an.instanceof(MeteoPlaya);
                expect(res.getNombrePlaya()).to.equal('Calahonda');
                expect(res.getEstadoCielo()).to.have.lengthOf(2);
                expect(res.getViento()).to.have.lengthOf(2);
                expect(res.getOleaje()).to.have.lengthOf(2);
                expect(res.getTempAgua()).to.equal(15);
                expect(res.getTempMax()).to.equal(19);
                expect(res.getFecha()).to.equal(hoy);
    
                done();
            });
        });
    
    
        it('Debería poder eliminar datos de playa', function(done){
            expect(ops_playa.eliminar('Calahonda')).to.not.throw;
            done();
        });

    });
describe('Tests para operaciones con incendios', function(){
    it('Debería cargar la biblioteca de operaciones con incendios y poder instanciarse',function(){
        expect(ops_incendio).to.exist
    });

    it('Debería poder eliminar todos los datos de incendio', function(done){
        expect(ops_incendio.eliminarDatos()).to.not.throw;
        done();
    });

    it('Debería poder insertar datos de incendios', function(done){
        ops_incendio.consultar('Canarias',predicciones,peticiones,function(res){
            var hoy = new Date().toJSON().slice(0,10);
            expect(res).to.be.an.instanceof(MeteoIncendio);
            expect(res.getZona()).to.equal('Canarias');
            expect(res.getGrafico()).to.be.a('string');
            expect(res.getFecha()).to.equal(hoy);

            done();
        });
    });

    it('Debería poder consultar datos de incendio', function(done){
        ops_incendio.consultar('Canarias',predicciones,peticiones,function(res){
            var hoy = new Date().toJSON().slice(0,10);
            expect(res).to.be.an.instanceof(MeteoIncendio);
            expect(res.getZona()).to.equal('Canarias');
            expect(res.getGrafico()).to.be.a('string');
            expect(res.getFecha()).to.equal(hoy);
            done();
        });
    });

    it('Debería poder actualizar datos de incendio', function(done){
       var area='Canarias';
       var grafico='<html><img src="https://opendata.aemet.es/opendata/sh/88ff3ad8"></html>';
     var fecha=new Date();
       fecha.setDate(fecha.getDate() - 1);
        fecha = fecha.toJSON().slice(0,10);
       var  gi=new MeteoIncendio(area,fecha,grafico);

        ops_incendio.actualizar(gi,function(res){
            expect(res).to.be.an.instanceof(MeteoIncendio);
            expect(res.getFecha()).to.equal(fecha);

            done();
        });
    });

    it('Debería poder consultar datos de incendio', function(done){
        ops_incendio.consultar('Canarias',predicciones,peticiones,function(res){
            var hoy = new Date().toJSON().slice(0,10);
            expect(res).to.be.an.instanceof(MeteoIncendio);
            expect(res.getZona()).to.equal('Canarias');
            expect(res.getGrafico()).to.be.a('string');
            expect(res.getFecha()).to.equal(hoy);


            done();
        });
    });

    it('Debería poder consultar datos de incendio', function(done){
        ops_incendio.consultar('Baleares',predicciones,peticiones,function(res){
            var hoy = new Date().toJSON().slice(0,10);
            expect(res).to.be.an.instanceof(MeteoIncendio);
            expect(res.getZona()).to.equal('Baleares');
            expect(res.getGrafico()).to.be.a('string');
            expect(res.getFecha()).to.equal(hoy);


            done();
        });
    });

    it('Debería poder consultar datos de incendio', function(done){
        ops_incendio.consultar('península',predicciones,peticiones,function(res){
            var hoy = new Date().toJSON().slice(0,10);
            expect(res).to.be.an.instanceof(MeteoIncendio);
            expect(res.getZona()).to.equal('peninsula');
            expect(res.getGrafico()).to.be.a('string');
            expect(res.getFecha()).to.equal(hoy);


            done();
        });
    });


    it('Debería devolver un mensaje de que no existen dichos datos de incendio', function(done){
        ops_incendio.consultar('caaffaf',predicciones,peticiones,function(res){
            expect(res).to.equal("No existe tal mapa de incendio");
            done();
        });
    });

    

    it('Debería poder eliminar datos de incendio', function(done){
        expect(ops_incendio.eliminar('Canarias')).to.not.throw;
        done();
    });

    it('Debería poder eliminar todos los datos de incendio', function(done){
        expect(ops_incendio.eliminarDatos()).to.not.throw;
        done();
    });

   

    });
