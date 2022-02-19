require('dotenv').config();
const express = require('express');
const { StatusCodes } = require('http-status-codes');
const sequelize = require('./db/config')

require('./db/associations')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const authentication = require('./middleware/authenticate')
const ExpressError = require('./errors/ExpressError')

const authRouter = require('./routes/authRouter')
const jobRouter = require('./routes/jobRouter')




app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authentication, jobRouter)

app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found', StatusCodes.NOT_FOUND))
})

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Algo anduvo mal' } = err
  res.status(statusCode).send(message)
})

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