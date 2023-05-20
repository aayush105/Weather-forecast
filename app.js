const express = require("express");
const { write } = require("fs");
const https = require("https");

const app = express();

app.get("/", function(req, res){

    const url = "https://api.openweathermap.org/data/2.5/weather?q=Nepal&appid=a63439b3be41ca1d0f4c92c903d8ecf5&units=metric"  // api of the weather website

    https.get(url, function(response){
        console.log(response.statusCode); // will provide the status code of the url in hyper terminal 

        response.on("data", function(data){
            // console.log(data); // it gives the data of the api in hex form

            const weatherData = JSON.parse(data); // converts the hex data into the JSON format

            const temp = weatherData.main.temp; // gets the temp of the location
            // console.log(temp);
            
            const weatherDescription = weatherData.weather[0].description; // gets the description of the location
            // console.log(weatherDescription);

            const icon = weatherData.weather[0].icon; // gets the icon tag

            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"; // gets the image of the icon tag

            res.write("<p>The weather is currently " + weatherDescription +"</p>" ); // to show on our website

            res.write("<h1>The temperature in Nepal is "+ temp +" degrees celcius.</h1>"); // only one res.send can be used so we used res.write for multiple times and then used res.send once to send our info to the website

            res.write("<img src="+ imageURL +">");
            res.send();
            /*
            const object = {
                name: "Aayush",
                food: "Momo"
            }
            console.log(JSON.stringify(object)); // this convert JSON format(3D) into the 1D , can be seen in terminal.
            */
        })
    })
})

app.listen(3000, function(){
    console.log("Server is running at port 3000.");
})