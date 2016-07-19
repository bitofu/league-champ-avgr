var express = require('express');
var app = express();
var config = require('./config')();

app.set('port', process.env.PORT || 3000);
app.use(express.static('dist'));

app.get('/summoner', function (req, res) {
  console.log(req.query)
  res.send(req.query)
  // url: 'https://na.api.pvp.net/api/lol/' + this.state.region + '/v1.4/summoner/by-name/' + this.state.summonerName + '?api_key=' + process.env.RIOT_API_KEY
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});