const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const schemaArticle = new Schema({
    title: String,
    content: String,
    url: String,
    comments: [{
        type: Schema.Types.ObjectId, ref: 'Comment'
    }],
    user:{
        type: Schema.Types.ObjectId, ref: 'User'
    }
},{
    timestamps:
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    } 
})


const Article = mongoose.model('Article', schemaArticle)

module.exports = Article