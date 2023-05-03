import  {Router}  from "express";
import passport from "passport";


const Rutas = Router()
Rutas.get("/", (req, res, next) => {
    res.render('home')
});

Rutas.get('/signup', (req, res, next) =>{
    res.render('signup')
});

Rutas.post('/signup', passport.authenticate("local-signup", {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

Rutas.get('/signin', (req, res, next) =>{
    res.render('signin')
});

Rutas.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}))

Rutas.get('/profile', (req,res,next) => {
    res.render('profile')
})


export default Rutas

