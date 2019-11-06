const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)

const app = express()
// first port is for "heroku" and second is for our "local system"
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Sanjit Pd'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Sanjit Pd'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'Hi there how are you!',
        title: 'Help',
        name: 'Sanjit Pd'
    })
})

// app.com/weather
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { lat, lon, loc } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(lat, lon, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: loc,
                address: req.query.address
            })
        })
    })

   
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404 help',
        name: 'Sanit Pd',
        errorMessage: 'Help article not found'
    })
})


// * is wild card character, match everything
app.get('*',(req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Sanjit Pd',
        errorMessage: 'Page not found'
    })
})


app.listen(port,()=>{
    console.log(`Server is up on port ${port}.`)
})