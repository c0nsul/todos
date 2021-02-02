const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000

const app = express()
//tpls
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
//page rendering
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
//parsing body
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(todoRoutes)

async function  start() {
    try {
        await mongoose.connect(
            'mongodb+srv://mongouser:mongopass@cluster0.drmct.mongodb.net/node-mongo-app', {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log('server has been started')
        })
    } catch (e) {
        console.log(e)
    }
}
start()
