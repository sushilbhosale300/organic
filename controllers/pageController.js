const Post = require('../models/post');
const mongoose = require('mongoose');
var ObjectID = require('mongoose').Types.ObjectId


exports.create = async (req,res) => {
        const post = req.body;
        const newPost = new Post(post);

        try{
    
            await newPost.save();
    
            res.status(201).json(newPost);
    
    
        }catch(error){

            res.status(409).json({message:error.message})
    
        }
    
        res.send('Post Creation..');
    }


    exports.edit = async (req,res) =>{

        if (!ObjectID.isValid(req.params.id))
            return res.status(400).send('No record with given id : ' + req.params.id)
    
        var updatedRecord = {
            title: req.body.title,
            content: req.body.content,
            keywords:req.body.keywords,
            
        }
    
        Post.findByIdAndUpdate(req.params.id, { $set: updatedRecord },{new:true}, (err, data) => {
            if (!err) res.status(400).json({ data })
            else console.log('Error while updating a record : ' + JSON.stringify(err, undefined, 2))
        })
    }

    
exports.remove = async = (req,res) =>{
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('No record with given id : ' + req.params.id)

    Post.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) res.status(200).json({ data })
        else console.log('Error while deleting a record : ' + JSON.stringify(err, undefined, 2))
    })
}