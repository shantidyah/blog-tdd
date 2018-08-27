var chai = require('chai');
var chaiHttp = require('chai-http');
// var app = require('../app.js');
var should = chai.should();
var mongoose = require('mongoose')
var Users = require('../models/users')
var Articles = require('../models/articles')

const jwt = require('jsonwebtoken')


chai.use(chaiHttp)
require('dotenv').config()

var url = "https://blog-server.shantidyah.club"


mongoose.connect('mongodb://shantidyah:asd12345@ds145121.mlab.com:45121/blog_tdd_testing'
    ,{useNewUrlParser:true},function(err){
        if(err){
            console.log(err);
        }
        // console.log('connect mongoose')
    
})


// describe("User",function(){
    // afterEach (function(done){
    //     mongoose.connect('mongodb://shantidyah:asd12345@ds145121.mlab.com:45121/blog_tdd_testing',{useNewUrlParser:true},function(err){
    //         if(err){
    //             console.log(err);
    //         }
    //         else{
    //             Users.collection.drop()
    //             done()
            
    //         }
    //     })
    // })

    // it('should create new user on /register',function(done){
    //     chai.request(url)
    //         .post('/register')
    //         .send({
    //             "name":"marimar",
    //             "email":"marimar@mail.com",
    //             "password":"12345"
    //         })
    //         .end(function(err, res){
    //             res.body.should.be.a('object')
    //             res.body.should.have.property('name');
    //             res.body.should.have.property('email');            
    //             res.body.should.have.property('_id');
    //             res.body.should.have.property('password');
    //             res.body.name.should.equal('marimar')
    //             res.body.email.should.equal('marimar@mail.com')
    //             res.body.password.should.equal('12345')
    //             res.body.name.should.be.a('string')
    //             res.body.email.should.be.a('string')
    //             res.body.password.should.be.a('string')
    //             res.should.have.status(201)
    //             done()
    //         })
    // })

    // it('should get a token on /login', function(done){
    //     chai.request(url)
    //         .post('/login')
    //         .send({
    //             "email":"marimar@mail.com",
    //             "password":"12345"
    //         })
    //         .end(function(err, res){
    //             var decoded = jwt.verify(res.body, process.env.secretKey);
    //             // console.log(decoded);
    //             // console.log("ini status",res.status);
    //             // res.should.have.status(400)
    //             decoded.email.should.equal('marimar@mail.com')
    //             decoded.should.have.property('name');
    //             decoded.should.have.property('email');            
    //             decoded.should.have.property('id');
    //             res.body.should.be.a('string')
    //             decoded.should.be.a('object')
    //             res.should.have.status(200)
    //             done()
    //         })
    // })

// })

describe("Article",function(){
    // afterEach (function(done){
    //     mongoose.connect('mongodb://shantidyah:asd12345@ds145121.mlab.com:45121/blog_tdd_testing',{useNewUrlParser:true},function(err){
    //         if(err){
    //             console.log(err);
    //         }
    //         else{
    //             Articles.collection.drop()
    //             done()
            
    //         }
    //     })
    // })

    it('should create new article on /articles/add with authorization', function(done){
        chai.request(url)
            .post('/articles/add')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hhbnRpIiwiaWQiOiI1YjdkMWI5N2QyZjQzMDJlNzg5YzgxOTYiLCJlbWFpbCI6InNoYW50aUBtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUzNDkyNjQzNn0.jNKc8lf8gfnvwhj_ZPR6CKnfLsFNTBvrK7VFtDH8vvI')
            .send({
                "title": "testing",
                "content":"testing use mocha chai",
                "url":"test.jpg"
            })
            .end(function(err, res){
                // console.log(res.body);             
                // res.should.have.status(401)
                res.body.should.have.property('title')
                res.body.should.have.property('content')
                res.body.should.have.property('url')
                res.body.should.have.property('comments')
                res.body.title.should.equal('testing')
                res.body.content.should.equal('testing use mocha chai')
                res.body.url.should.equal('test.jpg')
                res.body.title.should.be.a('string')
                res.should.have.status(201)
                done()
            })
    })

    it('should get list of article on /articles', function(done){
        chai.request(url)
            .get('/articles')
            .end(function(err, res){
                // console.log(res.body);
                res.body.should.be.a('array')
                res.should.have.status(200)
                res.body[0].should.be.a('object')
                res.body[0].should.have.property('title')
                res.body[0].should.have.property('content')
                res.body[0].should.have.property('url')
                res.body[0].should.have.property('comments')
                done()
            })
    })

    it('should create new comment and push comment to the article on /articles/:id/addcomment', function(done){
        var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hhbnRpIiwiaWQiOiI1YjdkMWI5N2QyZjQzMDJlNzg5YzgxOTYiLCJlbWFpbCI6InNoYW50aUBtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUzNDkyNjQzNn0.jNKc8lf8gfnvwhj_ZPR6CKnfLsFNTBvrK7VFtDH8vvI'
        var decoded = jwt.verify(token, process.env.secretKey);
        chai.request(url)
            .post('/articles/5b7d7315ac72e865625568c5/addcomment')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hhbnRpIiwiaWQiOiI1YjdkMWI5N2QyZjQzMDJlNzg5YzgxOTYiLCJlbWFpbCI6InNoYW50aUBtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUzNDkyNjQzNn0.jNKc8lf8gfnvwhj_ZPR6CKnfLsFNTBvrK7VFtDH8vvI')
            .send({
                comment: 'goood!!',
                user: decoded.id
            })
            .end(function(err, res){
                // console.log(res.body);
                res.body.should.be.a('object')
                res.body.should.have.property('comments')
                res.body.comments.should.be.a('array')
                res.body._id.should.equal('5b7d7315ac72e865625568c5')
                res.should.have.status(201)
                done()
            })
    })

    it('should get detail article on /article/detail/:id', function(done){
        chai.request(url)
            .get('/articles/detail/5b7d7315ac72e865625568c5')
            .end(function(err, res){
                console.log(res.body);
                res.body.should.be.a('object')
                res.body.should.have.property('comments')
                res.body.should.have.property('title')
                res.body.should.have.property('content')
                res.body.should.have.property('url')
                res.body.comments.should.be.a('array')
                res.body._id.should.equal('5b7d7315ac72e865625568c5')
                res.should.have.status(200)   
                done()
            })
    })

    it('should delete a comment on /articles/:id/deletecomment/:idcom', function(done){
        var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hhbnRpIiwiaWQiOiI1YjdkMWI5N2QyZjQzMDJlNzg5YzgxOTYiLCJlbWFpbCI6InNoYW50aUBtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUzNDkyNjQzNn0.jNKc8lf8gfnvwhj_ZPR6CKnfLsFNTBvrK7VFtDH8vvI'
        var decoded = jwt.verify(token, process.env.secretKey);   
        chai.request(url)
            .delete('/articles/5b7d7315ac72e865625568c5/deletecomment/5b7d74828ce24c673583724e')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hhbnRpIiwiaWQiOiI1YjdkMWI5N2QyZjQzMDJlNzg5YzgxOTYiLCJlbWFpbCI6InNoYW50aUBtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUzNDkyNjQzNn0.jNKc8lf8gfnvwhj_ZPR6CKnfLsFNTBvrK7VFtDH8vvI')
            .end(function(err, res){
                console.log(res.body);
                res.body.should.be.a('object')
                res.body.should.have.property('_id')
                res.body.should.have.property('comment')
                res.body.should.have.property('user')
                res.body._id.should.equal('5b7d74828ce24c673583724e')
                res.body.user.should.equal(decoded.id)
                res.should.have.status(200)                
                done()
            })
    })

    it('should update article on /update/:id', function(done){
        chai.request(url)
            .put('/articles/update/5b7d7315ac72e865625568c5')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hhbnRpIiwiaWQiOiI1YjdkMWI5N2QyZjQzMDJlNzg5YzgxOTYiLCJlbWFpbCI6InNoYW50aUBtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUzNDkyNjQzNn0.jNKc8lf8gfnvwhj_ZPR6CKnfLsFNTBvrK7VFtDH8vvI')
            .send({
                "title": "testing dimana ini",
                "content":"testing use mocha chai",
                "url":"test.jpg"
            })
            .end(function(err, res){
                // console.log(res.body);

                res.should.have.status(201)  
                res.body.should.have.property('title')
                res.body.should.have.property('content')
                res.body.should.have.property('url')
                res.body.title.should.be.a('string')              
                res.body.content.should.be.a('string')           
                res.body.comments.should.be.a('array')           

                done()
            })
    })

   
    it('should delete article on /delete/:id', function(done){
        chai.request(url)
            .delete('/articles/delete/5b7d7315ac72e865625568c5')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hhbnRpIiwiaWQiOiI1YjdkMWI5N2QyZjQzMDJlNzg5YzgxOTYiLCJlbWFpbCI6InNoYW50aUBtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUzNDkyNjQzNn0.jNKc8lf8gfnvwhj_ZPR6CKnfLsFNTBvrK7VFtDH8vvI')
            .end(function(err, res){
                // console.log(res.body);

                res.should.have.status(200)  
                res.body.should.have.property('title')
                res.body.should.have.property('content')
                res.body.should.have.property('url')
                res.body.should.have.property('comments')
                res.body.title.should.be.a('string')  
                res.body.content.should.be.a('string')           
                res.body.comments.should.be.a('array')           


                done()
            })
    }) 

    


})





    // it('should get a token on /login', function(done){
    //     chai.request(url)
    //         .post('/login')
    //         .send({
    //             "email":"marimar@mail.com",
    //             "password":"12345"
    //         })
    //         .end(function(err, res){

    //             done()
    //         })
    // })


    // token admin : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hhbnRpIiwiaWQiOiI1YjdkMWI5N2QyZjQzMDJlNzg5YzgxOTYiLCJlbWFpbCI6InNoYW50aUBtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUzNDkyNjQzNn0.jNKc8lf8gfnvwhj_ZPR6CKnfLsFNTBvrK7VFtDH8vvI
    // token non admin : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWFyaW1hciIsImlkIjoiNWI3ZDAzZjhmZjU0MzAxYWJjNDBjODkwIiwiZW1haWwiOiJtYXJpbWFyQG1haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzNDkyNjQwNn0.mSPAYnBVLIeQfi_qvrM52jYazrkBLfo6yZB33K9xMKM