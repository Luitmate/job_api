require('dotenv').config();
const express = require('express')
const sequelize = require('./db/config')
require('./db/associations')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const authenticateUser = require('./middleware/authenticate')

const authRouter = require('./routes/authRouter')
const jobRouter = require('./routes/jobRouter')

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobRouter)


const PORT = process.env.PORT || 3000

app.listen(PORT, async(req, res) => {
    console.log(`Serving on port ${PORT}`)
    try {
        await sequelize.sync({ force: false });
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})