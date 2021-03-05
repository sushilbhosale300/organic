const express = require('express');
const router = express.Router();
const {create,edit,remove} = require('../controllers/pageController');


const { isRequestValidated } = require('../validator/auth');


//routes


// 
// 

router.post('/create',  isRequestValidated, create);
router.post('/edit/:id',  edit);
router.post('/delete/:id',  remove);





module.exports = router;
