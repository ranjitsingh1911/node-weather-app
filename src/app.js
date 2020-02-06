const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const port = process.env.PORT || 3000

console.log(__dirname)
console.log(path.join(__dirname,'../public'))
console.log(__filename)

// Setup Paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewDirPath = path.join(__dirname,'../templates/views')
const includePath = path.join(__dirname,'../templates/includes')

//  Setup Handblebars engine and viewss path
app.set('view engine','hbs')
app.set('views',viewDirPath)
hbs.registerPartials(includePath)

// Set Static Directory To Serve 
app.use(express.static(publicDirectoryPath))

// This will not work if express.static is set and that file contains index.html
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'Please Provide Address'})
    } 
    geocode(req.query.address,(error,{latitude,longitude}={}) => {
        if(error){
            return res.send({error:'Goecode Data Not Available'})
        }
        forecast(latitude,longitude,(error,forcastData) => {
            if(error){
                return res.send({error:'Forcast Data Not Available'})
            }   
            res.send(forcastData)
        })
    })
    
})



app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name:'Ranjit'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Ranjit',
        content:'Help Text Content Goes Here.'

    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Us',
        name:'Ranjit',
        content:'About Us Page Text Content Goes Here.'

    })
})

// app.get('/about',(req,res)=>{
//     res.send([{'name':'ranijt'},{'email':'ranijt@test.com'}])
// })

// app.get('/weather',(req,res)=>{
//     res.send('Weather Page')
// })


app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'Error',
        name:'Ranjit',
        content:'Help Article Not Found'

    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'Error',
        name:'Ranjit',
        content:'Page Not Found'

    })
}) 

app.listen(port,()=>{
    console.log('Server Started at Port ' + port)
})

//app.com
//app.com/help
//app.com/about