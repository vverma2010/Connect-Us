const express = require('express');
const homeController = require('../controller/home_controller');
const router = express.Router();


router.get('/', homeController.home);
router.use('/users',require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));



// for any further routes, access from here
// router.use('./routerName', require('./routerFile'));


module.exports = router;