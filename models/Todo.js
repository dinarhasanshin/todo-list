const {Schema, Types, model} = require('mongoose')

const schema = new Schema({
    title: {type: String},
    isCompleted: {type: Boolean, default: false , required: true},
    owner: {type: Types.ObjectId, ref: 'User'},
    order: {type: Number, required: true}
})

module.exports = model('Todo', schema)