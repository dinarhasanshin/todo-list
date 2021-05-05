const {Schema, Types, model} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    todos: {type: Types.ObjectId, ref: 'Todo'}
})

module.exports = model('User', schema)