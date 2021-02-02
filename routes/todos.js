const {Router} = require('express')
const Todo = require('../models/todo')
const router = Router()

router.get('/', async (req, res) => {
    const todos = await Todo.find({}).lean()

    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        todos
    })
})

router.get('/create', ((req, res) =>
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    })
))

router.post('/create', async (req, res) => {
    //created new object Todo
    const todo = new Todo ({
        title: req.body.title
    })

    //await promise and save
    await todo.save()
    res.redirect('/')
})

router.post('/complete', async (req, res) => {
    //as in template "id"
    const todo = await Todo.findById(req.body.id)
    //update status
    //   !! - convert to bool
    todo.completed = !!req.body.completed
    await todo.save()
    res.redirect('/')
})

module.exports = router