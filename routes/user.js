const express = require('express');

const router = express.Router();

const userController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/profile/:id',passport.checkAuthentication , userController.profile);
router.post('/update/:id' , passport.checkAuthentication , userController.update);

// ading router for sign in and signup page
router.get('/sign-up' , userController.signUp);
router.get('/sign-in' , userController.signin);

router.post('/create', userController.create);

//signing in the using passport authentication
router.post('/create-session' ,passport.authenticate('local' , {failureRedirect: '/users/sign-in'},) ,userController.createSession);

router.get('/sign-out' , userController.destroySession);

//forget password
router.get('/forget-password' , userController.forgetPassword);
router.post('/reset-password' , userController.sendRestMail);
router.get('/reset-password/:token' , userController.resetPassword);
router.post('/change-password' , userController.changePassword)


router.get('/auth/google' , passport.authenticate('google' , {scope: ['profile' , 'email']}));
router.get('/auth/google/callback' , passport.authenticate('google' , {failureRedirect: '/users/sign-in'}) , userController.createSession);

module.exports = router;