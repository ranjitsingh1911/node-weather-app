const request = require('request')

const getForcast = (lat,long,callback)=>{

    const url = 'https://api.darksky.net/forecast/9358c4ada77c33c597e5dd115f9f8b7c/'+lat+','+long

    request({url:url,json:true},(error,response,body)=>{

        if(error){
            callback('Unable to Connect to Forcast API',undefined)
        }else if(body.error){
            console.log('Error Fetching Forcast Data')
        }else{

            console.log('Data From Weather API')
            console.log('-----------------------------')
            console.log('TimeZone:'+body.timezone)
            console.log('Current Weather:'+body.currently.summary)
            console.log('Current Temprature:'+body.currently.temperature)
            console.log('Hourly Weather:'+body.hourly.summary)
            console.log('Daily Weather:'+body.daily.summary)

            const data = {
                timezone:body.timezone,
                currentWeather:body.currently.summary,
                currentTemp:body.currently.temperature,
                hourlyWeather:body.hourly.summary,
                dailyWeather:body.daily.summary
            }
            callback(undefined,data)
        }
        
    })
}

module.exports =  getForcast
