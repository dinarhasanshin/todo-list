const {Router} = require('express')
const Todo = require('../models/Todo')
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')

const router = Router()

//todoApi/todo/create
router.post('/create', auth, async (req, res) => {
    try {

        const {title, owner} = req.body


        const user = await User.findOne({ _id: req.user.userId })
        user.maxOrder++
        const todo = new Todo({ title, owner, order: user.maxOrder })
        await todo.save()
        await user.save()

        res.json({ todo })
    }catch (e) {
        res.status(500).json({
            message: 'Произошла ошибка'
        })
    }
})

//todoApi/todo/update
router.post('/update', auth, async(req, res) => {
    try {

        const {todoId, field, value} = req.body

        const todo = await Todo.findById({ _id: todoId })
        if(todo){
            todo[field] = value
            await todo.save()
            return res.status(200).json(todo)
        }

    }catch (e) {
        res.status(500).json({
            message: 'Произошла ошибка'
        })
    }
})

//todoApi/todo/delete
router.post('/delete', auth, async(req, res) => {
    try {

        const {todoId} = req.body

        const todo = await Todo.findOneAndDelete({ _id: todoId })
        res.status(200).json(todo)

    }catch (e) {
        res.status(500).json({
            message: 'Произошла ошибка'
        })
    }
})


//todoApi/todo/
router.get('/', auth, async(req, res) => {
    try {
        const todos = await Todo.find({ owner: req.user.userId })
        res.json(todos)
    }catch (e) {
        res.status(500).json({
            message: 'Произошла ошибка'
        })
    }
})

module.exports = router

