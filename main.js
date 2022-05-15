
import express from 'express'
import engine from 'ejs-mate'
import flash from 'connect-flash'
import session from 'express-session'
import passport from 'passport'
import path from 'path'
import sessionRouter from './routers/users.js'
import productosApiRouter from './routers/productos.js'
import carritosApiRouter from './routers/carritos.js'

//Importamos la estrategia local
import('./passport/local-auth.js')

//Instancia servidor y API
const app = express()

//Configuracion servidor
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('views/public'));

// settings
app.set('port', process.env.PORT || 8080);
app.set('views',path.join(process.cwd(),'/views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// middlewares
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30000
}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.user = req.user;
  //console.log(app.locals)
  next();
});

//Conexion Mongo
import mongoose from 'mongoose'
mongoose
    .connect("mongodb+srv://nicojapaz:Spirit01@cluster0.guz7s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => console.log("Connected"))
    .catch(error => console.error(error));

//rutas del servidor API Rest
app.use('/api/producto', productosApiRouter)
app.use('/api/carrito', carritosApiRouter)
app.use('/', sessionRouter);


const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
  });
server.on('error', error => console.log(`Error en servidor: ${error}`))
