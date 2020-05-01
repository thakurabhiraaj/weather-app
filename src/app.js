const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicPathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebar engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicPathDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'abhiraj thakur'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'abhiraj thakur',
        helpText:'how can i help you'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'abhiraj thakur',
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'abhiraj',
        errorMessage: 'HELP ARTICLE NOT FOUND'
    })
})

app.get('/weather', (req, res)=> {
    if (!req.query.address){
        return res.send({
            error: 'you must provide a valid address'
        })
    }
    geocode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(lattitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
          })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'abhiraj',
        errorMessage: 'PAGE NOT FOUND'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})