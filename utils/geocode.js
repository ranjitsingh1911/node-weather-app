const request = require('request')

const getGeoCode = (address,callback)=>{

    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaHJpbmZvY2FyZSIsImEiOiJjazVycGR1cG0wMmQ0M2xvMTQ1MG9oYXY0In0.hL09e_0QF0IPBLGbzZJLVw'

    request({url:mapBoxUrl,json:true},(error,response,body)=>{

        if(error){
            callback('Unable to Connect to Geo Code API',undefined)
        }else if(body.features.length==0){            
            callback('Could Not Find Location.',undefined)
        }else{
            const lat = body.features[0].geometry.coordinates[1]
            const long = body.features[0].geometry.coordinates[0]
            const location = body.features[0].place_name
            console.log('Data From Mapbox API')
            console.log('-----------------------------')
            console.log('Place Name:' + body.features[0].place_name)
            console.log('Latitude:'+ lat)
            console.log('Longitude:'+ long)
            const data = {
                latitude:lat,
                longitude:long,
                location:location
            }
            callback(undefined,data)
        }
        
    })
}

module.exports =  getGeoCode
