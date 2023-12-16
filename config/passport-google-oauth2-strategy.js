const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');


passport.use(new googleStrategy(
    {
    clientID: "600828953536-ceposvuqglanbru1quvb6meqen1sq0hg.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL: "https://codify-87fd.onrender.com/users/auth/google/callback"
    },

    async function (accessToken, refreshToken, profile, done) {
        try{
            //find user
            let user = await User.findOne({ email: profile.emails[0].value });

            if(user){
                //if user found set this user as req.user
                return done(null,user);
            }
            else{
                //if user not found create user and set it as req.user
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });
                return done(null,user);
            }
        }
        catch(err){
            console.log("Error in google strategy passport",err);
            return;
        }
    }
));


module.exports = passport;