require('dotenv').config()

 const express = require('express')
 const app = express()
 var cors = require('cors')
 const mongoose = require('mongoose')

///above dependinecies	
const port = process.env.PORT
app.use(cors())
 mongoose.connect(process.env.database_url, { usenewurlparser: true })
 const db = mongoose.connection

 db.on('error', (error) => console.error(error))
 db.once('open', () => console.log('connected to database'))
 app.use(express.json())
 const subscribersRouter = require('./routes/users')
 const customRouter = require('./routes/CustomRoute')
 const recipeRouter = require('./routes/recipe')
 const reviewRouter = require('./routes/reviews.js')
 app.use('/users', subscribersRouter)
 app.use('/custom', customRouter)
 app.use('/recipe', recipeRouter)
 app.use('/reviews', reviewRouter)
app.listen(port, () => console.log(`server started at ${port}`))