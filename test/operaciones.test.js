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
            done();

            expect(mt).to.be.an.instanceof(MeteoTextual);
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
        expect(operaciones.getDatoTextual('cataluña',predicciones,peticiones,function(mt){
            done();

            expect(mt).to.be.an.instanceof(MeteoTextual);

            var hoy = new Date().toJSON().slice(0,10);
            expect(mt).to.be.an.instanceof(MeteoTextual);
            expect(mt.getZona()).to.equal('cataluña');
            expect(mt.getDia()).to.equal(hoy);
            expect(mt.getTexto()).to.be.a('string');    
        })).to.not.throw;
    });

    it('Debería poder actualizar los datos de un municipio', function(done){
        operaciones.actualizarDatosMunicipio('Sevilla',predicciones,peticiones,function(mm){
            done();

            expect(mm).to.be.an.instanceof(MeteoMunicipio);
        });
    });

    it('Debería poder comprobar datos de municipio', function(done){
        expect(operaciones.getDatoMunicipio('Granada',predicciones,peticiones,function(mm){
            done();

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
        })).to.not.throw;
    });    
/*     
    it('Actualizar datos textual', function(done){
        expect(operaciones.actualizarDatosTextual(predicciones,peticiones)).to.not.throw;
        done();
    });



    it('Debería poder ELIMINAR datos textuales', function(){
        expect(operaciones.eliminarDatosTextual()).to.not.throw;
    });




    it('Debería poder comprobar datos textuales', function(done){
        expect(operaciones.getDatoMunicipio('Sevilla',predicciones,peticiones,function(mm){
            expect(mm).to.be.an.instanceof(MeteoTextual);
        })).to.not.throw;

        done();
    });



    it('Debería poder comprobar datos textuales', function(){
        expect(operaciones.comprobarDatosTextual()).to.not.throw;
    }); */
}); 