const express = require('express');
const passport = require('passport');
const router = express.Router();


const postsApi = require("../../../controller/api/v1/post_api");

router.get('/', postsApi.index);
router.delete('/:id',passport.authenticate('jwt' , {session: false}), postsApi.destroy);
module.exports = router;