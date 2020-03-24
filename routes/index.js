const express = require('express');
const homeController = require('../controller/home_controller');
const router = express.Router();


router.get('/', homeController.home);
router.use('/users',require('./users'));



// for any further routes, access from here
// router.use('./routerName', require('./routerFile'));


module.exports = router;