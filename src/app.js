require('dotenv').config();
const express = require('express');
const { StatusCodes } = require('http-status-codes');
const sequelize = require('./db/config')

require('./db/associations')

//Security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')


//Swagger
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
	  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
)

app.use(helmet())
app.use(cors())
app.use(xss())



const authentication = require('./middleware/authenticate')

const authRouter = require('./routes/authRouter')
const jobRouter = require('./routes/jobRouter')

app.get('/', (req, res) => {
  res.send('<h1>jobs API</h1><a href="/api-docs">Documentation</a>')
})
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))


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