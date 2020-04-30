const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController = require('../controller/posts_controller');



router.post('/newpost',passport.checkAuthentication, postController.posts);
router.get('/destroy/:id', passport.checkAuthentication,postController.destroy);
// iska mtlb phle hum homepage pr jaynge ??
// routetr.use("/soemthing",require('./somehting'));
// router.use('/users/posts', require('./users'));

module.exports = router;