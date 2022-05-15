# entrega3-nico

Ecommerce Backend: tercera entrega.

Aplicación Backend Node JS con Express, registro y autenticación utilizando Passport Local, 
encriptado de password con Bcrypt y renderizado con motor de plantillas ejs-mate.

Incluye connect-flash para mensajes entre las distintas páginas del sitio, y subida de imágenes al servidor con Multer.
Se utiliza Winston para registro de logs.

Dbaas: Mongo DB.

PaaS: Heroku.

Para correr el proyecto, ejecutar en consola: "npm run start".

Algunos usuarios ya registrados como ejemplo (para probar inicio de sesión):

user: nicojapaz@gmail.com

password: test

user: elian@gmail.com

password: test

user: lau@gmail.com

password: test

Aclaración: a los tres usuarios de prueba les puse mi número de teléfono para que me lleguen sus sms de orden de compra a mí. 

Endpoints:

GET / : Ruta raíz. 

GET /signin : Vista de inicio de sesión.

POST /signin :  Una vez validado el usuario, redirige a su perfil. 

GET /signup : Vista de registro de nuevo usuario. 

POST /signup : 

Se completan los datos y se sube una imagen al servidor. 
El input url de la imagen se debe completar con el mismo nombre de la imagen que se va a subir.
Una vez que se registra el usuario, se redirige a crear un nuevo carrito vacío con fecha y user id.
Cuando ya creó su carrito, puede ir a '/profile' y verá sus datos. En cada nuevoo registro, se envía un mail 
al administrador con todos los datos del usuario registrado.

POST /carrito : 

Crea un nuevo carrito vacío, con fecha y su user id. Si un usuario existente borra su carrito, cuando
vuelva a su perfil o inicie sesión se le pedirá que cree un nuevo carrito. Para agregar/borrar productos del carrito, se utilizan los
mismos endpoints de la segunda entrega (ver más abajo).

GET /profile :

Vista de los datos del usuario registrado, los _id's de los productos en su carrito, y el inventario de productos
disponibles (componentes card). La sesión permanece abierta 30 segundos por seguridad.

POST /profile : Se genera la orden de compra, se envía un mail y un sms al usuario con la lista de productos de su carrito.

GET /logout : Se cierra la sesión.

Para correr en modo fork ejecutar en consola:

pm2 start main.js --watch

Para correr en modo cluster con n hilos de procesamiento:

pm2 start main.js --watch -i n

Para pruebas con Artillery, con el servidor local funcionando, abrir otra terminal y ejecutar: 

artillery quick --count 20 -n 40 http://localhost:8080/api/producto > result.txt

Resulta más eficiente el modo cluster (media de respuestas por segundo y latencia).

En cuanto a los endpoints de la API, siguen funcionando tal cual la segunda entrega:

Endpoints Productos:

GET /api/producto  : Lista todos los productos.

GET /api/producto/:id_producto  : Lista el producto correspondiente al id_producto.

POST /api/producto  : Crea un nuevo producto en base al req.body.

PUT /api/producto/:id_producto  : Actualiza el producto correspondiente al id_producto.

DELETE /api/producto/:id_producto  : Elimina el producto correspondiente al id_producto.

Endpoints Carritos:

GET /api/carrito  : Lista todos los carritos.

GET /api/carrito/:id_carrito  : Lista el carrito correspondiente al id_carrito.

POST /api/carrito  : Crea un nuevo carrito con id, fecha de creación, y un array de productos vacío.

POST /api/carrito/:id_carrito/producto/:id_producto  : Agrega el producto id_producto al array del carrito id_carrito.

DELETE /api/carrito/:id_carrito/producto/:id_producto  : Borra el producto id_producto del array del carrito id_carrito.

GET /api/carrito/:id_carrito/producto/:id_producto  : Muestra la cantidad del producto id_producto que hay en el array del carrito id_carrito.

DELETE /api/carrito/:id_carrito  : Borra el carrito con id_carrito.
