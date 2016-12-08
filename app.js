var express = require('express');

var secretKey = process.env.secretKey;
var gameID = process.env.gameID;
var gameURL = 'https://' + gameID + '.playfabapi.com/Server/UpdateUserData'
console.log(gameURL);

var app = express();

//request
var request = require('request');

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log('App now running on port', port);
});


//request
function call(key) {

  request({
      url: gameURL,
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-SecretKey': secretKey
      },
      json: {
            PlayFabID : key,
            Data :{verified : 'true'}
      },
  }, function(error, response, body){
      if(error) {
        console.log(error);
      } else if (response.statusCode === 200){
        console.log(response.statusCode, body.status);
      } else {
        console.log(body.status, body.errorMessage);
      }
  });
}

//get
app.get('*', function(req, res) {
  var id = req.query.id;

  if (!id){
    res.send('Invalid request');
  } else if (id.match(/^[0-9a-zA-F]{1,16}$/) && id.length === 16){
    res.send('Valid input');
    call (id);
  } else {
    res.send('Invalid input');
  }
  
});

//https://YOUR_HEROKU_APP_NAME.herokuapp.com?id=1234567890ABCDEF



