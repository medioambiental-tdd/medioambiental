var datos = {
    status: 200,
    statusText: 'OK',
    text() { return 'TEXTO'; }
};

function get_datos_api_externa(URL){
    // segun URL devolver datos diferentes

    return datos;
}

module.exports = {
    get_datos_api_externa
}