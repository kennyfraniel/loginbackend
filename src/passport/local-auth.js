import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/user.js";


passport.serializeUser((user,done) => {
    done(null, user.id);
});

passport.deserializeUser (async(id,done) => {
    const user = await User.findById(id);
    done(null, user);
});
passport.use("local-signup", new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req ,email, password, done) => {

    const user = User.findOne({email: email})
    if(user) {
        return done(null, false, req.flash('signupMessage', 'El email ya existe'));
    }else{
        const user = new User ()
        user.email = email;
        user.password = password;
        await user.save()
        done(null, user)
    }
}))

passport.use('local-signin', new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    await User.findOne({email: email});
    if (user) {
        return done(null, false, req.flash('signinMessage','No User Found. '));
    }
    if(!user.comparePassword(password)){
    return done (null, false, req.flash('signinMessage','Incorrect Password'))
    }
    done(null,user);
}))

export default LocalStrategy