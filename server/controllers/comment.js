const Articles = require('../models/articles.js')
const Comments = require('../models/comments.js')
const Users = require('../models/users.js')

const jwt = require('jsonwebtoken')

class Comment{
    static addComment(req, res){
        var decoded = jwt.verify(req.headers.token, process.env.secretKey)
        console.log(decoded);
        
        Comments.create({
            comment: req.body.comment,
            user: decoded.id
        })
        .then( comment => {
            Articles.findByIdAndUpdate(req.params.id,{
                $push: {'comments':comment._id}
            })
            .then( addcomment =>{
                res.status(201).json(addcomment)
            })
            .catch(err =>{
                res.status(400).json({msg:err})
            })
        })
        .catch( err => {
            res.status(400).json({msg:err})
        })
    }
    static deleteComment( req, res ){
        var decoded = jwt.verify(req.headers.token, process.env.secretKey)
        console.log(decoded);
        
        Comments.findOne({
            user:decoded.id,
            _id: req.params.idcom
        })
        .then(comment=>{
            console.log(comment);
            if(comment){
                Articles.findByIdAndUpdate(req.params.id,{
                    $pull: {'comments': req.params.idcom}
                })
                .then( article =>{
                    Comments.findByIdAndRemove(req.params.idcom)
                    .then(comment=>{
                        res.status(200).json(comment)
                    })
                    .catch(err=>{
                        res.status(400).json({msg:err})
                    })
                })
                .catch(err=>{
                    res.status(400).json({msg:err})
                })
            }
            else{
                console.log("masuk sini");
                
                res.status(401).json({msg:'failed authentication'})
            }
        })
        .catch(err=>{
            res.status(400).json({msg:err})
        })
    }
}


module.exports = Comment

