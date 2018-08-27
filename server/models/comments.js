const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const schemaComment = new Schema({
    comment: String,
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
},{
    timestamps:
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    } 
})


const Comment = mongoose.model('Comment', schemaComment)

module.exports = Comment