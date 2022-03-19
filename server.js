const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed, models: {Dog, Type}} = require("./db")

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json()) //body parser for a post

// Routes

app.get('/api/dogs', async(req, res, next) => {
    try {
        res.send(await Dog.findAll())
    } catch (err) {
        next(err)
    }
})

app.post('/api/dogs', async(req, res, next) => {
    try {
        res.status(201).send(await Dog.create(req.body))
    } catch (err) {
        next(err)
    }
})

app.delete('/api/dogs/:id', async(req, res, next) => {
    try {
        const dog = await Dog.findByPk(req.params.id)
        await dog.destroy()
        res.sendStatus(204)
    } catch (err) {
        next(err)
    }
})

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await syncAndSeed()
        app.listen(port, ()=> console.log(`listening on port ${port}`));
    } catch (err) {
        console.log(err)
    }
}

start()
