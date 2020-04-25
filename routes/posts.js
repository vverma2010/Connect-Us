const express = require('express');
const router = express.Router();

const postController = require('../controller/posts_controller');



router.post('/newpost', postController.posts);

// iska mtlb phle hum homepage pr jaynge ??
// routetr.use("/soemthing",require('./somehting'));
// router.use('/users/posts', require('./users'));

module.exports = router;