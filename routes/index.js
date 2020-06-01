const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');
const friendshipController=require('../controller/friendship_controller');


router.get('/', homeController.home);
router.use('/users',require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/API', require('./API'));
router.use('/likes',require('./likes'));
router.get("/toggle/friendship/",friendshipController.connectFriend);


// for any further routes, access from here
// router.use('./routerName', require('./routerFile'));


module.exports = router;  