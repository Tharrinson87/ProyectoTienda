create database Tienda
go
use Tienda
go
create table Administrador(
Usuario nvarchar(25),
Clave nvarchar(100)
)
go
insert into Administrador(Usuario, Clave)
values('admin','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3')
go
create table Clientes(
IdCliente int identity(1,1) primary key,
Nombre nvarchar(25),
Apellidos nvarchar(150),
Direccion nvarchar(max),
Clave varchar(100)
)
go
create table Tiendas(
IdTienda int identity(1,1) primary key,
Sucursal nvarchar(10) ,
Direccion nvarchar(max)
)
go
create table Articulos(
Codigo nvarchar(10) primary key,
Descripcion nvarchar(max),
Precio decimal(10,2),
Imagen varbinary(max),
Stock int
)
go
create table Articulo_Tienda(
Codigo nvarchar(10),
IdTienda int,
Fecha datetime,
foreign key (Codigo) references Articulos(Codigo),
foreign key (IdTienda) references Tiendas(IdTienda)
)
go
create table Cliente_Articulo(
IdCliente int,
Codigo nvarchar(10),
Fecha datetime,
foreign key (IdCliente) references Clientes(IdCliente),
foreign key (Codigo) references Articulos(Codigo)
)
go

create procedure ConsultaArtXTienda(
	@idTienda int
)
as
	select a.*
	from Articulos a inner join Articulo_Tienda t
	on a.Codigo = t.Codigo
	where t.IdTienda = @idTienda
go

