import  express  from "express";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import * as path from "path";
import __dirname from "./utils.js";
import viewsRouter from './routes/routes.js'
import morgan from "morgan";
import { MONGO_URI } from "./config/mongodb.js";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import LocalStrategy from "./passport/local-auth.js"
import flash from "connect-flash"
 


const app = express();

const httpServer = app.listen(5000, () => { console.log('escuchando!') })
const io = new Server(httpServer)




//Initialization//


mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Conectado a mongodb")
    })
    .catch((err) => {
        console.log("no funciona:"+err)
    })
    

//Handlebars//
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))


//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'kennyfraniel',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use ((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    next();
})
//Static//
app.use("/", express.static(__dirname + "/public"))

app.use('/', viewsRouter)