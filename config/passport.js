
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../modules/userModel');

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, function (email, password, done) {
        
    console.log("email recebido + " + email);
    return userModel.find( {where: { email: email} } )
        .then(user => {
            
            if (!user) {
                console.log("USUARIO NAO EXISTE");
                return done(null, false, {message: 'Incorrect email or password.'});               
            }
            console.log("COMPARAR SENHAS DO EMAIL " + user.email);
            
            bcrypt.compare(password, user.password, (error, same) => {
                if(same) {
                    console.log("IGUAL " + user.password);
                    return done(null, user);
                } else {
                    console.log("DIFERENTE DE" + user.password);
                    return done(null, false, { message: "senha errada" });
                }
            });        
        })
        .catch(err => {
            console.log("erro na segunda" + err);
            done(err)
        });
    }
));

passport.serializeUser((user, done) => { 
    console.log("SERIALIZOU");
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    userModel.findById(id, (err, user) => {
        console.log("DESERIALIZOU");
        done(err, user);
    })
});

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {
        return userModel.find( {where: { email: jwtPayload} } )
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));