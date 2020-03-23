const chai = require('chai');
const expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const operaciones = require('../src/model/operaciones');
const predicciones = require('../src/services/predicciones');
const peticiones  = require('../src/mocks/peticiones');
const MeteoTextual = require('../src/model/MeteoTextual');
const MeteoMunicipio = require ('../src/model/MeteoMunicipio');

describe('Tests para operaciones con BD', function(){
    it('Debería cargar la biblioteca y poder instanciarse',function(){
        expect(operaciones).to.exist
    });

    it('Debería poder insertar datos textuales', function(done){
        operaciones.insertarDatosTextual('aaa','texto',function(mt){
            expect(mt).to.be.an.instanceof(MeteoTextual);

            done();
        });
    });

    it('Debería poder eliminar datos textuales', function(done){
        operaciones.eliminarDatosTextual('aaa');
        done();
    });


    it('Debería poder consultar todos los datos textuales', function(done){
        operaciones.obtenerDatosTextual(function(err,tabla){
            if(err) done(err);
            else
                done();

            expect(tabla[0]).to.have.all.keys('zona', 'texto');
        });
    });

    it('Debería poder comprobar datos textuales por ccaa', function(done){
        expect(operaciones.getDatoTextual('gotham',predicciones,peticiones,function(mt){

            expect(mt).to.be.an.instanceof(MeteoTextual);

            var hoy = new Date().toJSON().slice(0,10);
            expect(mt).to.be.an.instanceof(MeteoTextual);
            expect(mt.getZona()).to.equal('gotham');
            expect(mt.getDia()).to.equal(hoy);
            expect(mt.getTexto()).to.be.a('string');

            done();
        })).to.not.throw;
    });

    it('Debería poder actualizar datos textuales por ccaa', async()=>{
            var mt1 = await predicciones.get_prediccion_textual('gotham',peticiones.get_datos_api_externa);
            var date = new Date();
            date.setDate(date.getDate() - 1);
            date = date.toJSON().slice(0,10);

            mt1.setDia(date);

            operaciones.actualizarTextual(mt1,function(mt2){                
                expect(mt2).to.be.an.instanceof(MeteoTextual);
                expect(mt2.getZona()).to.equal('gotham');
                expect(mt2.getDia()).to.equal(date);
                expect(mt2.getTexto()).to.be.a('string');

                operaciones.getDatoTextual('gotham',predicciones,peticiones,function(mt){
                    expect(mt).to.be.an.instanceof(MeteoTextual);
        
                    var hoy = new Date().toJSON().slice(0,10);
                    expect(mt).to.be.an.instanceof(MeteoTextual);
                    expect(mt.getZona()).to.equal('gotham');
                    expect(mt.getDia()).to.equal(hoy);
                    expect(mt.getTexto()).to.be.a('string');    
                });        
            });
    });

    it('Debería poder eliminar datos textuales', function(){
        expect(operaciones.eliminarDatosTextual('gotham')).to.not.throw;
    });

    it('Debería poder actualizar los datos de un municipio', function(done){
        operaciones.actualizarDatosMunicipio('Sevilla',predicciones,peticiones,function(mm){
            expect(mm).to.be.an.instanceof(MeteoMunicipio);
            done();
        });
    });

    it('Debería poder comprobar datos de municipio', function(done){
        expect(operaciones.getDatoMunicipio('Granada',predicciones,peticiones,function(mm){

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
        expect(operaciones.getDatoMunicipio('Motril',predicciones,peticiones,function(mm){
            var hoy = new Date().toJSON().slice(0,10);            
            expect(mm).to.be.an.instanceOf(MeteoMunicipio);
            expect(mm.getNombreMunicipio()).to.equal("Motril");
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
        operaciones.eliminarMunicipio('Granada');


        var datos = await predicciones.get_prediccion_municipio('Granada',peticiones.get_datos_api_externa);
        operaciones.insertarMunicipio(datos,function(mm){

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

        operaciones.eliminarMunicipio('Granada');
        var datos = await predicciones.get_prediccion_municipio('Granada',peticiones.get_datos_api_externa);
    });

    it('Debería indicar que un municipio no existe',function(done){
        operaciones.getDatoMunicipio('Arkham',predicciones,peticiones,function(mm){
            expect(mm).to.equal('No existe tal municipio');
            done();
        });
    });
});