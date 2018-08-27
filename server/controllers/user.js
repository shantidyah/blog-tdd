const jwt = require('jsonwebtoken')
const Users = require('../models/users.js')
const bcrypt = require('bcryptjs')

class User{
    static addUser(req, res){
        const saltRounds = 5;
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(req.body.password, salt)

        Users.findOne({
            email: req.body.email
        })
        .then( user =>{
            if(user){
                res.status(400).json({msg:'email already used'})
            }
            else{
                if(req.body.password.length<6){
                    res.status(400).json({msg:"password must have minimum 6 character"})
                }
                else{
                    Users.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    })
                    .then( user =>{
                        var token = jwt.sign({ name: user.name, id: user._id, email: user.email }, process.env.secretKey);
    
                        res.status(201).json(hash)
                    })
                    .catch( err =>{
                        var split = err.message.split(':')
                        var errmsg = split[2]
                        res.status(400).json({msg: err.message})
                    })
                }
                }
        })
        .catch(err=>{
            res.status(400).json({msg:err})
        })

  
    }
    static Login( req, res ){
        Users.findOne({
            email: req.body.email
        })
        .then( user =>{
            if(user){
                var statusPass = bcrypt.compareSync(req.body.password, user.password)
                if(statusPass){
                    var token = jwt.sign({ name: user.name, id: user._id, email: user.email }, process.env.secretKey);
                    res.status(200).json(token)
                }
                else{
                    res.status(400).json({msg:"your password invalid"})
                }
            }
            else{
                res.status(400).json({msg:"your email invalid"})
            }
        })
        .catch( err =>{
            res.status(401).json({msg:err})
        })
    }
}


module.exports = User

