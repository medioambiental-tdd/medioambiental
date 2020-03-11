const express = require('express');
const app     = express();
const PORT = process.env.PORT || 5000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/tiempo/:municipio/:dia',(req,res) =>{
    MeteoMunicipio m1 = new MeteoMunicipio();
    m1.pedirDatosMunicipio();

    // convertir a JSON
    var json = {};

    res.send(json);
});


app.listen(PORT, () => console.log(`Servidor iniciado en puerto: ${PORT}`));

module.exports = app;