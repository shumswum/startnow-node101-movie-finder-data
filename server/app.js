const express = require('express');
const morgan = require("morgan");
const axios = require("axios");

const app = express();

app.use(morgan("dev"));
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
var oldRequests = {};


app.get("/", function(req, res) {
    var omdb;
    console.log(req.url);
    console.log("Cached Requests", Object.keys(oldRequests).length);
    if(oldRequests[req.url] === undefined) {
        axios.get("http://www.omdbapi.com" + req.url + "&apikey=8730e0e")
        .then(function(response) {
                oldRequests[req.url] = response.data;
                res.status(200).json(oldRequests[req.url]);
            })
        .catch(function (error) {
                res.status(500).send(error.message);
            });
    } else {
        res.status(200).json(oldRequests[req.url]);
    }
  

});
    



module.exports = app;
