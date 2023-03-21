//============= Entara en la base de datos ===============//


Pra accedes a la base de datos es mediante el programa "HeidiSQL", y una vez abierto se entra en el perfil de LocalHost.

Una vez abierto el estaran todas las bases y la que se usa es la que se llama "ccitub_api"

En la base de datos esta todas las tablas con sus nombres correspondientes.

//============= Poner en marcha la API ===============//

para prenderla hay que entrar en la carpeta del proyecto y en ella abra una carpeta llamada [cmder]
en cuanto entres ejecuata el archivo "Cmder.exe" y se te abrira una consola en la cual debes poner lo siguientes comandos

1. Comando para poder movete a la carpeta padre es:

cd ..
 
2. para poder poner en marcha la api pon el siguiente comando

npm run dev

//============= Editar los archivos de la API ===============//

En los archivos de la api todo el codigo es dentro de la carpeta [src]

los mas importantes son el indes.ts que es el donde se crea todo el servidor y donde podemos elejir el puerto por defecto esta el 3000

tambien donde estn todas las rutas a las cules se les hace las peticiones esta en la carpera [src/routers/routes.ts]

las rutas hau dos metodos esta el "post" y el "get"

las rutas tienen de encabezado una pequeña descripcion de lo que hace
