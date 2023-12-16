const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtarctJWT = require('passport-jwt').ExtarctJWT;

const User = require('../models/user');
const { ExtractJwt } = require('passport-jwt');

let opts ={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

// passport.use(new JWTStrategy(opts , function(JWTPayload , done){

//     User.findById(JWTPayload._id , function(err , user){
//         if(err){
//            return console.log('Error in finding user from JWT ' , err)
//         }

//         if(user){
//             return done(null , user);
//         }else{
//             return done(null , false);
//         }
//     })


// }));

passport.use(new JWTStrategy(opts, async function (JWTPayload, done) {
    try {
      const user = await User.findById(JWTPayload._id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      console.log('Error in finding user from JWT:', error);
      return done(error, false);
    }
}));

module.exports = passport;