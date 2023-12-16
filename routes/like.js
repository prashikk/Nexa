const express = require('express');
const router = express.Router();
const passport = require('passport');

const likesController = require('../controllers/likes_controller');
console.log('toggler router reached')
router.get('/toggle', passport.checkAuthentication ,likesController.toggleLike);


module.exports = router;


