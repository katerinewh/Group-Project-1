var express = require('express');
var bodyParser = require('body-parser');
var Pusher = require('pusher');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var pusher = new Pusher({ appId: ""658081"", key: "62ef5893517d68df6c0c", secret:  "416310d8265a05b76895", cluster: "us2" });
app.post('/message', function(req, res) {
  var message = req.body.message;
  pusher.trigger( 'public-chat', 'message-added', { message });
  res.sendStatus(200);
});
app.get('/',function(req,res){      
     res.sendFile('/public/index.html', {root: __dirname });
});
app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`app listening on port ${port}!`)
});