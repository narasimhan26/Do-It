const express = require('express');
const router = express.Router();
const {addUser, allowUser, disAllowUser} = require('../controllers/usersController');

router
  .route('/signup')
  .post(addUser);

router
  .route('/signin')
  .post(allowUser);

router
  .route('/signout')
  .post(disAllowUser);

module.exports = router;