const request = require('request')

const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWJoaXJhaiIsImEiOiJjazhxemp4dGwwNG44M2dxbnJ0bjgyN3ZhIn0.h6Ln4e66K_dObW_sv9hgOw&limit=1'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('unable to connect to the location service.', undefined)
        }else if(body.message || body.features.length === 0){
            callback('unable to find the location. please change the search term.', undefined)
        }else(
            callback(undefined,{
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        )
    })

}

module.exports = geocode