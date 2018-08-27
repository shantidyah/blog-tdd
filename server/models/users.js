const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const schemaUser = new Schema({
    name: {
        type: String,
        required: [true, "name cannot empty"]
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator : function(val) {
                var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(val)
            },
            message: result => `${result.value} is not a valid email!`
        }
    },
    password: {
        type: String
    }
},{
    timestamps:
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    } 
})


const User = mongoose.model('User', schemaUser)

module.exports = User