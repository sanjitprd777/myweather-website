const request = require('request')

// Making a callback function to do above thing

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2Fuaml0cGQ3NzciLCJhIjoiY2sxZXZmbjBuMGxiYjNncGRsNmFqZHB3aSJ9.Xv0lgg9XSMgWd3fISLQ2Rw&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) { // for low level error like internet
            callback('Unable to connect to Location service!', undefined)
        }
        else if (body.features.length === 0) { // for url problem or no data received
            callback('Unable to find required location!', undefined);
        }
        else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                loc: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode