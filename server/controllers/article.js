const Articles = require('../models/articles.js')
const Comments = require('../models/comments.js')
const Users = require('../models/users.js')
var jwt = require('jsonwebtoken')


class Article{
    static addArticle( req, res ){
        var decoded = jwt.verify(req.headers.token, process.env.secretKey)
        Articles.create({
            title: req.body.title,
            content: req.body.content,
            url: req.body.url,
            user: decoded.id
        })
        .then(article => {
            res.status(201).json(article)
        })
        .catch(err=>{
            res.status(400).json({msg:err})
        })
    }
    static List( req, res ){
        Articles.find({})
        .sort({'updated_at': 'desc'})
        .populate('user')
        .populate({
            path : 'comments',
            populate : {
                path : 'user',
                model : 'User'
            }
        })
        .then(articles =>{
            res.status(200).json(articles)
        })
        .catch(err=>{
            res.status(400).json({msg:err})
        })
    }
    static Detail(req, res){
        Articles.find({_id:req.params.id})
        .sort({'updated_at': 'desc'})
        .populate('user')
        .populate({
            path : 'comments',
            populate : {
                path : 'user',
                model : 'User'
            }
        })
        .then(article=>{
            res.status(200).json(article)
        })
        .catch(err=>{
            res.status(400).json({msg:err})
        })
    }
    static DeleteArticle(req,res){
        var decoded = jwt.verify(req.headers.token, process.env.secretKey)
        // console.log("masuk delete",req.params.id);
        // console.log("masuk delete decoded",decoded.id);

        Articles.findById(req.params.id)
        .then(article=>{
            if(article.user==decoded.id){
                Articles.findByIdAndRemove(req.params.id)
                .then(result=>{
                    console.log("berhasil delete");
                    res.status(200).json(article) 
                })
                .catch(err=>{
                    res.status(400).json({msg:err})
                })
            }
            else{
                // console.log("gagal delete");
                res.status(400).json({msg:"you dont have access to delete this article"})
            }
        })
        .catch(err=>{
            res.status(400).json({msg:err})
        })
  
    }
    static Update(req,res){
        
        var decoded = jwt.verify(req.headers.token, process.env.secretKey)
        // console.log("masuk update");
        Articles.findById(req.params.id)
        .then(article=>{
            console.log(article.user==decoded.id);
            if(article.user==decoded.id){
                Articles.findByIdAndUpdate(req.params.id,{
                    title: req.body.title,
                    content: req.body.content,
                    url: req.body.url
                })
                .then(article=>{
                    console.log("berhasil update");
                    
                    res.status(201).json(article)
                })
                .catch(err=>{
                    console.log("gagal update");
                    
                    res.status(400).json({msg:err})
                })
            }
            else{
                // console.log("masuk dont have access");
                res.status(400).json({msg:"you dont have an access to edit this article"})
            }
        })
        .catch(err=>{
            res.status(400).json({msg:err})
        })




    }
    static Upload(req,res){
        console.log("masuk upload gcp");
        
        res.send({
            status: 200,
            message: 'Your file is successfully uploaded',
            link: req.file.cloudStoragePublicUrl,
            // file: req.file
        })
    }
}

module.exports = Article
