const express       = require('express');
const app           = express();
const PORT          = process.env.PORT || 5000;
const ops_municipio = require('./ops_municipio');
const ops_textual   = require('./ops_textual'); 
const ops_montaña   = require('./ops_montaña'); 

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/tiempo/:municipio',(req,res) =>{
    ops_textual.consultar(req.params.municipio,function(mt){
        var json = {
            zona: mt.getZona(),
            fecha: mt.getDia(),
            texto: mt.getTexto()
        }

        res.send(json);
    })
});

app.get('/tiempo/prediccion/:municipio', (req,res) =>{
    ops_municipio.consultar(req.params.municipio,function(mm){
        if(mm=='No existe tal municipio')
            res.status(400).send(mm);
        else{
            var json = {
                municipio: mm.getNombreMunicipio(),
                fecha: mm.getFecha(),
                estadoCielo:[   
                    {periodo:"00-06",valor:mm.getEstadoCielo()[0]},
                    {periodo:"06-12",valor:mm.getEstadoCielo()[1]},
                    {periodo:"12-18",valor:mm.getEstadoCielo()[2]},
                    {periodo:"18-24",valor:mm.getEstadoCielo()[3]},
                ],
                probPrecipitacion:[ 
                    {periodo:"00-06",valor:mm.getProbPrecipitacion()[0]},
                    {periodo:"06-12",valor:mm.getProbPrecipitacion()[1]},
                    {periodo:"12-18",valor:mm.getProbPrecipitacion()[2]},
                    {periodo:"18-24",valor:mm.getProbPrecipitacion()[3]}
                ],
                probNieve: [ 
                    {periodo:"00-06",valor:mm.getCotaNieve()[0]},
                    {periodo:"06-12",valor:mm.getCotaNieve()[1]},
                    {periodo:"12-18",valor:mm.getCotaNieve()[2]},
                    {periodo:"18-24",valor:mm.getCotaNieve()[3]}
                ],
                temperatura:[ 
                    {periodo:"00-06",valor:mm.getTemperatura()[0]},
                    {periodo:"06-12",valor:mm.getTemperatura()[1]},
                    {periodo:"12-18",valor:mm.getTemperatura()[2]},
                    {periodo:"18-24",valor:mm.getTemperatura()[3]}
                ],
                sensacionTermica: [ 
                    {periodo:"00-06",valor:mm.getSensacionTermica()[0]},
                    {periodo:"06-12",valor:mm.getSensacionTermica()[1]},
                    {periodo:"12-18",valor:mm.getSensacionTermica()[2]},
                    {periodo:"18-24",valor:mm.getSensacionTermica()[3]}
                ],
                velocidadViento: [ 
                    {periodo:"00-06",valor:mm.getVelocidadViento()[0]},
                    {periodo:"06-12",valor:mm.getVelocidadViento()[1]},
                    {periodo:"12-18",valor:mm.getVelocidadViento()[2]},
                    {periodo:"18-24",valor:mm.getVelocidadViento()[3]}
                ],
                direccionViento:[ 
                    {periodo:"00-06",valor:mm.getDireccionViento()[0]},
                    {periodo:"06-12",valor:mm.getDireccionViento()[1]},
                    {periodo:"12-18",valor:mm.getDireccionViento()[2]},
                    {periodo:"18-24",valor:mm.getDireccionViento()[3]}
                ]
            }

            res.send(json);
        }
    });


    app.get('/tiempo/montaña/:nombre', (req,res)=>{
        ops_montaña.consultar(req.params.nombre,function(montaña){
            var json = {
                nombre: montaña.getNombre(),
                estado_cielo: montaña.getEstadoCielo(),
                precipitaciones: montaña.getPrecipitaciones(),
                tormentas: montaña.getTormentas(),
                temperaturas: montaña.getTemperaturas(),
                fecha: montaña.getFecha()
            };
    
            res.json(json);
        });
    });
});

var server = app.listen(PORT, () => console.log(`Servidor iniciado en puerto: ${PORT}`));
server.close();

module.exports = app;