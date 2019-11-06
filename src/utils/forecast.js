const request = require('request')

const forecast = (lat,lon,callback) =>{

    const url = 'https://api.darksky.net/forecast/40b8c1447caf9aec2433a65e872c1fbe/'+lat+','+lon+'?units=si&lang=en'

    request({ url, json: true }, (error, {body}) => {
        // console.log(body.currently)
        if (error) { // for low level error (internet connection)
            callback('Unable to connect to Weather service!',undefined);
        }
        else if (body.error) { // for url problems
            callback('Unable to find required location!',undefined)
        }
        else {
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress temperature. The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of '+ body.daily.data[0].temperatureLow +'. There is ' + body.currently.precipProbability + '% change of rain.')
        }
    })
}

module.exports = forecast