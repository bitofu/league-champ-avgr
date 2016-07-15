import React from 'react';
import ChampionTable from './ChampionTable';

class SummonerStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summonerName: this.props.summonerName,
      championsToDisplay: 3, // number dictates top # of champions to load stats about, used to limit API calls
      champions: [],
      matches: [],
      recentMatches: []
    };
  };

  componentDidMount() {
    $.when(
      $.ajax({ // get ranked champion stats for summoner
        type: 'GET',
        url: 'https://na.api.pvp.net/api/lol/' + this.props.region + '/v1.3/stats/by-summoner/' + this.props.summonerId + '/ranked?api_key=' + process.env.RIOT_API_KEY
      }),
      $.ajax({  // get ranked match history stats for summoner
        type: 'GET',
        url: 'https://na.api.pvp.net/api/lol/' + this.props.region + '/v2.2/matchlist/by-summoner/' + this.props.summonerId + '?rankedQueues=TEAM_BUILDER_DRAFT_RANKED_5x5,RANKED_SOLO_5x5,RANKED_TEAM_3x3,RANKED_TEAM_5x5&api_key=' + process.env.RIOT_API_KEY
      })
    ).then((championsData, matchesData) => {
      this.setState({
        summonerName: this.props.summonerName,
        champions: championsData[0].champions,
        matches: matchesData[0].matches,
        recentMatches: this.getRecent(matchesData[0].matches)
      });
    });
  };

  componentWillReceiveProps(nextProps) {
    $.when(
      $.ajax({ // get ranked champion stats for summoner
        type: 'GET',
        url: 'https://na.api.pvp.net/api/lol/' + nextProps.region + '/v1.3/stats/by-summoner/' + nextProps.summonerId + '/ranked?api_key=' + process.env.RIOT_API_KEY
      }),
      $.ajax({  // get ranked match history stats for summoner
        type: 'GET',
        url: 'https://na.api.pvp.net/api/lol/' + nextProps.region + '/v2.2/matchlist/by-summoner/' + nextProps.summonerId + '?rankedQueues=TEAM_BUILDER_DRAFT_RANKED_5x5,RANKED_SOLO_5x5,RANKED_TEAM_3x3,RANKED_TEAM_5x5&api_key=' + process.env.RIOT_API_KEY
      })
    ).then((championsData, matchesData) => {
      this.setState({
        summonerName: nextProps.summonerName,
        champions: championsData[0].champions,
        matches: matchesData[0].matches,
        recentMatches: this.getRecent(matchesData[0].matches)
      });
    });
  };

  getRecent(matches) {
    // return most recent 3 champions played of most recent games
    let firstChampion = matches[0].champion;
    let recentMatches = [];
    recentMatches.push(matches[0])
    matches.find((match) => {
      if (recentMatches.length < this.state.championsToDisplay && match.champion !== firstChampion) {
        recentMatches.push(match);
      };
    });
    return recentMatches;
  };

  render() {
    return (
      <div className='row'>
        <h1>{this.state.summonerName}</h1>
        <div className='row'>
          <h5>Recent {this.state.championsToDisplay} Champion Stats</h5>
          <div className='two columns'>
            <table className='u-full-width'>
              <tbody>
                <tr><th>Champion</th></tr>
                <tr><th>K / D / A (ratio)</th></tr>
                <tr><th>avg. Gold</th></tr>
                <tr><th>avg. Damage</th></tr>
                <tr><th>avg. Phy Dmg</th></tr>
                <tr><th>avg. Mag Dmg</th></tr>
                <tr><th>avg. Dmg Taken</th></tr>
                <tr><th>avg. CS</th></tr>
                <tr><th>avg. Towers</th></tr>
              </tbody>
            </table>
          </div>
          {this.state.recentMatches.map((match) => {
            return (<ChampionTable match={match} champions={this.state.champions} />)
          })}
        </div>
        <div className='row'>
          <h5>Top {this.state.championsToDisplay} Champion Stats</h5>
          <p>Coming soon</p>
        </div>
      </div>
    );
  };

};

export default SummonerStats;
