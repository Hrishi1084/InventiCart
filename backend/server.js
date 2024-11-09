require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const productRoutes = require('./routes/products')
const userRoutes = require('./routes/user')
const cors = require('cors');

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(cors({
  origin: ''
}));

app.use('/api/products', productRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to the Database & listening on Port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
