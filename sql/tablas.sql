CREATE TABLE IF NOT EXISTS textual(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    zona TEXT,
    texto TEXT,
    fecha TEXT);

CREATE TABLE IF NOT EXISTS ccaa(
    codigo TEXT PRIMARY KEY,
    nombre TEXT);

INSERT INTO ccaa (codigo,nombre) VALUES ('and','andalucia');
INSERT INTO ccaa (codigo,nombre) VALUES ('arn','aragon');
INSERT INTO ccaa (codigo,nombre) VALUES ('ast','asturias');
INSERT INTO ccaa (codigo,nombre) VALUES ('bal','baleares');
INSERT INTO ccaa (codigo,nombre) VALUES ('coo','canarias');
INSERT INTO ccaa (codigo,nombre) VALUES ('can','cantabria');
INSERT INTO ccaa (codigo,nombre) VALUES ('cle','castillaleon');
INSERT INTO ccaa (codigo,nombre) VALUES ('clm','castillamancha');
INSERT INTO ccaa (codigo,nombre) VALUES ('cat','cataluña');
INSERT INTO ccaa (codigo,nombre) VALUES ('ext','extremadura');
INSERT INTO ccaa (codigo,nombre) VALUES ('gal','galicia');
INSERT INTO ccaa (codigo,nombre) VALUES ('mad','madrid');
INSERT INTO ccaa (codigo,nombre) VALUES ('mur','murcia');
INSERT INTO ccaa (codigo,nombre) VALUES ('nav','navarra');
INSERT INTO ccaa (codigo,nombre) VALUES ('pva','paisvasco');
INSERT INTO ccaa (codigo,nombre) VALUES ('rio','larioja');

CREATE TABLE IF NOT EXISTS provincia(
    codigo TEXT PRIMARY KEY,
    nombre TEXT);

INSERT INTO provincia (codigo, nombre) VALUES ("01", "alava");
INSERT INTO provincia (codigo, nombre) VALUES ("02", "albacete");
INSERT INTO provincia (codigo, nombre) VALUES ("03", "alicante");
INSERT INTO provincia (codigo, nombre) VALUES ("04", "almería");
INSERT INTO provincia (codigo, nombre) VALUES ("05", "asturias");
INSERT INTO provincia (codigo, nombre) VALUES ("06", "avila");
INSERT INTO provincia (codigo, nombre) VALUES ("07", "badajoz");
INSERT INTO provincia (codigo, nombre) VALUES ("08", "barcelona");
INSERT INTO provincia (codigo, nombre) VALUES ("09", "burgos");
INSERT INTO provincia (codigo, nombre) VALUES ("10", "caceres");
INSERT INTO provincia (codigo, nombre) VALUES ("11", "cadiz");
INSERT INTO provincia (codigo, nombre) VALUES ("12", "cantabria");
INSERT INTO provincia (codigo, nombre) VALUES ("13", "castellon");
INSERT INTO provincia (codigo, nombre) VALUES ("14", "ciudadreal");
INSERT INTO provincia (codigo, nombre) VALUES ("15", "cordoba");
INSERT INTO provincia (codigo, nombre) VALUES ("16", "acoruña");
INSERT INTO provincia (codigo, nombre) VALUES ("17", "cuenca");
INSERT INTO provincia (codigo, nombre) VALUES ("18", "girona");
INSERT INTO provincia (codigo, nombre) VALUES ("19", "granada");
INSERT INTO provincia (codigo, nombre) VALUES ("20", "guadalajara);"
INSERT INTO provincia (codigo, nombre) VALUES ("21", "gipuzkoa");
INSERT INTO provincia (codigo, nombre) VALUES ("22", "huelva");
INSERT INTO provincia (codigo, nombre) VALUES ("23", "huesca");
INSERT INTO provincia (codigo, nombre) VALUES ("24", "baleares");
INSERT INTO provincia (codigo, nombre) VALUES ("25", "jaen");
INSERT INTO provincia (codigo, nombre) VALUES ("26", "leon");
INSERT INTO provincia (codigo, nombre) VALUES ("27", "lleida");
INSERT INTO provincia (codigo, nombre) VALUES ("28", "lugo");
INSERT INTO provincia (codigo, nombre) VALUES ("29", "madrid");
INSERT INTO provincia (codigo, nombre) VALUES ("30", "malaga");
INSERT INTO provincia (codigo, nombre) VALUES ("31", "murcia");
INSERT INTO provincia (codigo, nombre) VALUES ("32", "navarra");
INSERT INTO provincia (codigo, nombre) VALUES ("33", "ourense");
INSERT INTO provincia (codigo, nombre) VALUES ("34", "palencia");
INSERT INTO provincia (codigo, nombre) VALUES ("35", "palmas");
INSERT INTO provincia (codigo, nombre) VALUES ("36", "pontevedra");
INSERT INTO provincia (codigo, nombre) VALUES ("37", "rioja");
INSERT INTO provincia (codigo, nombre) VALUES ("38", "salamanca");
INSERT INTO provincia (codigo, nombre) VALUES ("39", "segovia");
INSERT INTO provincia (codigo, nombre) VALUES ("40", "sevilla");
INSERT INTO provincia (codigo, nombre) VALUES ("41", "soria");
INSERT INTO provincia (codigo, nombre) VALUES ("42", "tarragona");
INSERT INTO provincia (codigo, nombre) VALUES ("43", "tenerife");
INSERT INTO provincia (codigo, nombre) VALUES ("44", "teruel");
INSERT INTO provincia (codigo, nombre) VALUES ("45", "toledo");
INSERT INTO provincia (codigo, nombre) VALUES ("46", "valencia");
INSERT INTO provincia (codigo, nombre) VALUES ("47", "valladolid");
INSERT INTO provincia (codigo, nombre) VALUES ("48", "bizkaia");
INSERT INTO provincia (codigo, nombre) VALUES ("49", "zamora");
INSERT INTO provincia (codigo, nombre) VALUES ("50", "zaragoza");

CREATE TABLE IF NOT EXISTS montaña(
    codigo TEXT PRIMARY KEY,
    nombre TEXT);

INSERT INTO montaña (codigo, nombre) VALUES ("arn2", "iberica_aragonesa");
INSERT INTO montaña (codigo, nombre) VALUES ("rio1", "iberica_riojana");
INSERT INTO montaña (codigo, nombre) VALUES ("peu1", "picos_europa");
INSERT INTO montaña (codigo, nombre) VALUES ("arn1", "pirineo_aragones");
INSERT INTO montaña (codigo, nombre) VALUES ("cat1", "pirineo_catalan");
INSERT INTO montaña (codigo, nombre) VALUES ("nav1", "pirineo_navarro");
INSERT INTO montaña (codigo, nombre) VALUES ("gre1", "sierra_gredos");
INSERT INTO montaña (codigo, nombre) VALUES ("nev1", "sierra_nevada");
INSERT INTO montaña (codigo, nombre) VALUES ("mad2", "somosierra");

CREATE TABLE IF NOT EXISTS prediccion_montaña(
    nombre TEXT PRIMARY KEY,
    estado_cielo TEXT,
    precipitaciones TEXT,
    tormentas TEXT,
    temperaturas TEXT,
    fecha TEXT,

    FOREIGN KEY (nombre) REFERENCES montaña(nombre)
);