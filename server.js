require('dotenv').config();
var express = require('express');
var app = express();
var fetch = require('node-fetch');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.get('/get-summoner', function (req, res) {
  var name = req.query.summonerName.trim().toLowerCase().replace(' ', '');
  console.log('get-summoner: ' + name)
  fetch('https://na.api.pvp.net/api/lol/' + req.query.region + '/v1.4/summoner/by-name/' + name + '?api_key=' + process.env.RIOT_API_KEY)
    .then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status)
        res.sendStatus(status)
        return
      };

      response.json().then(function(data) {
        return data[name];
      })
      .then(function(summoner) {
        res.send(summoner);
      });
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err)
    });
});

app.get('/get-summoner-stats', function (req, res) {
  console.log('get-summoner-stats: ' + req.query.summonerId)
  console.log('fetching champion stats')
  fetch('https://na.api.pvp.net/api/lol/' + req.query.region + '/v1.3/stats/by-summoner/' + req.query.summonerId + '/ranked?api_key=' + process.env.RIOT_API_KEY)
    .then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status)
        res.sendStatus(status)
        return
      };

      response.json().then(function(data) {
        return data.champions;
      })
      // nested fetch to limit client to server communication
      // may have to change it so client asks for match list separately so it's not a large synchronous block
      .then(function(champions) {
        console.log('fetching match history')
        fetch('https://na.api.pvp.net/api/lol/' + req.query.region + '/v2.2/matchlist/by-summoner/' + req.query.summonerId + '?rankedQueues=TEAM_BUILDER_DRAFT_RANKED_5x5,RANKED_SOLO_5x5,RANKED_TEAM_3x3,RANKED_TEAM_5x5&api_key=' + process.env.RIOT_API_KEY)
          .then(function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status)
              res.sendStatus(status)
              return
            };

            response.json().then(function(data) {
              return data.matches
            })
            .then(function(matches) {
              res.send({champions: champions, matches: matches})
            });
          })
          .catch(function(err) {
            console.log('Fetch Error :-S', err)
          });
      });
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err)
    });
});

app.get('/get-champion', function (req, res) {
  // Should probably do this once a month and store a small db (maybe redis?) with champion info to reduce Riot API queries
  console.log('fetching champion data')
  fetch('https://global.api.pvp.net/api/lol/static-data/' + req.query.region + '/v1.2/champion/' + req.query.championId + '?api_key=' + process.env.RIOT_API_KEY)
    .then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem getting champion. Status Code: ' + response.status)
        res.sendStatus(status)
        return
      };

      response.json().then(function(data) {
        return data;
      })
      .then(function(champion) {
        res.send(champion);
      });
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err)
    });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});