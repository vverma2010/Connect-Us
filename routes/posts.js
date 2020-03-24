const express = require('express');
const router = express.Router();

const postController = require('../controller/posts_controller');



router.get('/', postController.posts);
// routetr.use("/soemthing",require('./somehting'));
// router.use('/users/posts', require('./users'));

module.exports = router;