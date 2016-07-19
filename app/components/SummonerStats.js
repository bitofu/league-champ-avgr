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
    this.getSummonerStats(this.props.region, this.props.summonerId);
  };

  componentWillReceiveProps(nextProps) {
    this.getSummonerStats(nextProps.region, nextProps.summonerId);
  };

  getSummonerStats(region, id) {
    fetch('./get-summoner-stats/?region=' + region + '&summonerId=' + id)
      .then((response) => {
        if (response.status !== 200) {
          // do error stuff
          console.log('Looks like there was a problem getting the summoner stats. Status Code: ' + response.status);
          return
        };

        return response.json()
      })
      .then((data) => {
        this.setState({
          summonerName: this.props.summonerName,
          champions: data.champions,
          matches: data.matches,
          recentMatches: this.getRecent(data.matches)
        });
      })
      .catch((err) => {
        console.log('[SummonerStats] Fetch Error :-S', err);
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
