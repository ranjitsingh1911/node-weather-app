//console.log('Local Javascript Loaded')

// fetch('http://puzzle.mead.io/puzzle').then( (response) => {
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const locationInput = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const location = locationInput.value
    fetch('/weather?address='+location).then( (response) => {
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }else{
                messageOne.textContent = ''
                messageTwo.textContent = 'Current Temprature is ' + data.currentTemp + '. It will be ' + data.hourlyWeather 
            }
            
        })
    })
})
