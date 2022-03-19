const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed, models: {Dog, Type}} = require("./db")

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use(express.static(path.join(__dirname, "public")));

// Routes

app.get('/api/dogs', async(req, res, next) => {
    try {
        res.send(await Dog.findAll())
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
