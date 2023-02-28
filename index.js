require('dotenv').config()
const express = require('express');
const cors = require("cors");
// eslint-disable-next-line no-undef
const port = process.env.PORT || 8080

const userRoutes = require('./app/routes/auth.routes')
const tokenRoutes = require('./app/routes/token.routes')

const app = express()

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('hello world')
})


app.use('/auth', userRoutes)
app.use('/token', tokenRoutes) 

app.listen(port, () => {
  console.log(`App running on port ${ port }`)
})
