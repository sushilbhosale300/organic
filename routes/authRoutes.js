const express = require('express');
const router = express.Router();
const {signup, signin, update, remove} = require('../controllers/auth');


const { validateSigninRequest,validateSignupRequest, isRequestValidated } = require('../validator/auth');


//routes


// 
// 

router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/signin', validateSigninRequest, isRequestValidated, signin);
router.post('/update/:id', validateSigninRequest, isRequestValidated, update);
router.post('/delete/:id',  isRequestValidated, remove);




module.exports = router;
