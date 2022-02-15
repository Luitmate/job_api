require('dotenv').config();
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('hola')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, async(req, res) => {
    console.log(`Serving on port ${PORT}`)
})