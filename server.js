const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './config/.env'})
const ShortUrl = require('./models/shortUrl')
const bodyParser = require('body-parser')
const app = express()

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false })) 

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()

  res.render('index', { shortUrls: shortUrls })
})

app.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl })

  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  
  if(shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})

app.listen(3000 , () => {
    console.log('app is running on port 3000....')
});