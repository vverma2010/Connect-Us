const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controller/users_controller');

router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.update);
router.use("/posts",require("./posts"));

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

router.post('/create', userController.create);

// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},

), userController.createSession);

router.get('/sign-out' , userController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email'] }));
router.get('/auth/google/callback', passport.authenticate('google',{failureRedirect:'/users/sign-in' }),userController.createSession);
// route for github auth
router.get('/auth/github',passport.authenticate('github',{scope:["user:email"]}));
router.get('/auth/github/callback', passport.authenticate('github',{failureRedirect:'/users/sign-in' }),userController.createSession);

module.exports = router;