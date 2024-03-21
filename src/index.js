import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import {join,dirname} from 'path';
import {fileURLToPath} from 'url'
import personasRoutes from './routes/personas.routes.js'

// Inicializacion
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
// Ajustes
app.set('port', process.env.PORT || 3000 );
app.set('views', join(__dirname,'views'));
app.engine('.hbs',engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'),'layouts'),
    partialsDir: join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set('view engine','.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.get('/',(req,res)=> {
    res.render("index")
})
app.use(personasRoutes);

// Archivos publicos
app.use(express.static(join(__dirname,'public')));

// Correr servidor
app.listen(app.get('port'), () =>
    console.log('Server en el puesto', app.get('port')));