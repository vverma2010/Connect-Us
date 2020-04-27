const express = require('express');
const router = express.Router();
const passport = require('passport');
const commentsController = require('../controller/comments_controller');



router.post('/newcomment',passport.checkAuthentication, commentsController.comments);

// iska mtlb phle hum homepage pr jaynge ??
// routetr.use("/soemthing",require('./somehting'));
// router.use('/users/posts', require('./users'));

module.exports = router;