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
