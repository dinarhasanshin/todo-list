const express = require('express')
const mongoose = require('mongoose')
const path = require('path')


const app = express()

app.use(express.json ({ extended: true }))

app.use('/todoApi/auth', require('./routes/auth.routes'))
app.use('/todoApi/todo', require('./routes/todo.routes'))

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const PORT = process.env.PORT || 5000

async function start () {
    try{
        await mongoose.connect('mongodb+srv://Huntmen:X48V35B73@cluster0.kk8na.mongodb.net/todoData?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}`)
        })
    }catch (e) {
        console.log('Server error')
        process.exit(1)
    }
}

start()