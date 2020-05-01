const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ encodeURIComponent(lat) +'&lon='+ encodeURIComponent(lon) +'&appid=9064775881adbb50e00a5f69078b54ee&units=metric'
    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('there is something wrong with your internet connection', undefined)
        }else if(body.cod){
            callback('something is wrong with your co-ordinates', undefined)
        }else{
            callback(undefined, {
                lattitude: body.lat,
                longitude: body.lon,
                place: body.timezone
            })
        }
    })
}

module.exports = forecast