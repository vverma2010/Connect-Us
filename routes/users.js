const express = require('express');

const router = express.Router();

const userController = require('../controller/users_controller');

router.get('/profile', userController.profile);
router.use("/posts",require("./posts"));

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

router.post('/create', userController.create);
router.post('/create-session', userController.createSession);
router.get('/sign-out', userController.signOut);
module.exports = router;        