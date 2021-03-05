const User = require('../models/user');
const jwt = require('jsonwebtoken');
var ObjectID = require('mongoose').Types.ObjectId

exports.signup = (req,res) =>{
    User.findOne({ email: req.body.email })
    .exec((error,user) =>{
        if(user){
            message:'User Already Exist'
        }
    });

    const {
        name,
        email,
        password,
        status,

    } = req.body
    
    const _user = new User({name,email,password,status});
    console.log(_user);
    
    _user.save((error,data)=>{
        if(error){
            return res.status(400).json({ message:'Something Went Wrong' });
        }
        if(data){
            return res.status(201).json({
                message : 'User Created Successfully'
            })
        }
    });


    
}



exports.signin = (req,res) =>{
    User.findOne({ email : req.body.email })
    .exec((error, user) =>{
        if(error) return res.status(400).json({ error });
        if(user){
            if(user.authenticate(req.body.password)){
                 
                const token = jwt.sign({_id: user._id, status:user.status }, process.env.JWT_SECRETE,{expiresIn:'1h'})
                const { _id, name, email,status } = user;
                if(status === 'Active'){

                    res.status(200).json({
                        token,
                        user:{
                            _id,
                            name, 
                            email,
                            status,
                            
                        }
                    });
                    
                }else{
                    return res.status(400).json({ message: 'Not allowed to login' });
                }

            }else{
                return res.status(400).json({
                    message:'Invalid Password'
                })
            }
        }else{
            return res.status(400).json({ message: 'Something Went Wrong' });
        }
    })
}


exports.update = async (req,res) =>{

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id : ' + req.params.id)

    var updatedRecord = {
        name: req.body.name,
        email: req.body.email,
        password:req.body.password,
        status : req.body.status
    }

    User.findByIdAndUpdate(req.params.id, { $set: updatedRecord },{new:true}, (err, data) => {
        if (!err) res.status(400).json({ data })
        else console.log('Error while updating a record : ' + JSON.stringify(err, undefined, 2))
    })
}


exports.remove = async = (req,res) =>{
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('No record with given id : ' + req.params.id)

    User.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) res.status(200).json({ data })
        else console.log('Error while deleting a record : ' + JSON.stringify(err, undefined, 2))
    })
}