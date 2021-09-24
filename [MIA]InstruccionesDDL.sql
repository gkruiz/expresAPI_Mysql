CREATE DATABASE if not exists GVE CHARACTER SET utf8 COLLATE utf8_general_ci;


USE GVE;


CREATE TABLE Temporal (
	ID INT auto_increment primary key,
	nombre_victima 		varchar(255),
	apellido_victima 	varchar(255),
	direccion_victima 	varchar(255),
	fecha_primera_sospecha 	datetime,
	fecha_confirmacion 	datetime,
	fecha_muerte		datetime,
	estado_victima		varchar(255),
	nombre_asociado		varchar(255),
	apellido_asociado	varchar(255),
	fecha_conocio		datetime,
	contacto_fisico		varchar(255),
	fecha_inicio_contacto	datetime,
	fecha_fin_contacto	datetime,
	nombre_hospital		varchar(255),
	direccion_hospital	varchar(255),
	ubicacion_victima	varchar(255),
	fecha_llegada		datetime,
	fecha_retiro		datetime,
	tratamiento			varchar(255),
	efectividad			INT,
	fecha_inicio_tratamiento datetime,
	fecha_fin_tratamiento	datetime,
	efectividad_en_victima	INT
);





CREATE TABLE hospital (
	ID INT auto_increment primary key,
	nombre		varchar(255),
	direccion	varchar(255)
);



CREATE TABLE victima (
	ID INT auto_increment primary key,
	nombre			varchar(255),
	apellido 		varchar(255),
	direccion 		varchar(255),
	fecha_primera_sospecha 	datetime,
	fecha_confirmacion	datetime,
	fecha_muerte		datetime,
	estado			varchar(255),
	hospital_ID		INT
);



CREATE TABLE tratamiento (
	ID INT auto_increment primary key,
	nombre			varchar(255),
	efectividad 		INT,
	fecha_inicio	 	datetime,
	fecha_fin		datetime,
	efectividad_victima	INT
);

CREATE TABLE contacto (
	ID INT auto_increment primary key,
	tipo			varchar(255),
	fecha_inicio	 	datetime,
	fecha_fin		datetime
);


CREATE TABLE ubicacion (
	ID INT auto_increment primary key,
	ubicacion		varchar(255),
	fecha_llegada	 	datetime,
	fecha_salida		datetime
);


CREATE TABLE asociado (
	ID INT auto_increment primary key,
	nombre		varchar(255),
	apellido	varchar(255),
	fecha_conocio	datetime
);


#INICIA ROMPER RELACION



CREATE TABLE victima_tratamiento (
	tratamiento_ID		INT,
	victima_ID		INT,
	victima_hospital_ID	INT
);


CREATE TABLE victima_contacto (
	victima_ID		INT,
	victima_hospital_ID	INT,
	contacto_ID		INT
);


CREATE TABLE victima_ubicacion (
	ubicacion_ID		INT,
	victima_ID		INT,
	victima_hospital_ID	INT
);



CREATE TABLE victima_asociado (
	asociado_ID		INT,
	victima_ID		INT,
	victima_hospital_ID	INT
);


#INICIA VINCULACION DE TABLAS 
#/*
alter table victima add foreign key (hospital_ID) references hospital(ID);
alter table victima_tratamiento add foreign key (victima_hospital_ID) references hospital(ID);


alter table victima_tratamiento add foreign key (victima_ID) references victima(ID);
alter table victima_tratamiento add foreign key (victima_hospital_ID) references hospital(ID);
alter table victima_tratamiento add foreign key (tratamiento_ID) references tratamiento(ID);



alter table victima_contacto add foreign key (victima_ID) references victima(ID);
alter table victima_contacto add foreign key (victima_hospital_ID) references hospital(ID);
alter table victima_contacto add foreign key (contacto_ID) references contacto(ID);



alter table victima_ubicacion add foreign key (victima_ID) references victima(ID);
alter table victima_ubicacion add foreign key (victima_hospital_ID) references hospital(ID);
alter table victima_ubicacion add foreign key (ubicacion_ID) references ubicacion(ID);



alter table victima_asociado add foreign key (victima_ID) references victima(ID);
alter table victima_asociado add foreign key (victima_hospital_ID) references hospital(ID);
alter table victima_asociado add foreign key (asociado_ID) references asociado(ID);


































