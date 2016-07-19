import React from 'react';

class ChampionTable extends React.Component {
  constructor(props, context) {
    super(props);
    let championStats = this.findChampion(this.props.match, this.props.champions);

    this.state = {
      region: context.region,
      match: this.props.match,
      champion: '',
      championStats: championStats,
      championAvg: {}
    };
  };

  componentDidMount() {
    this.getChampion(this.state.region, this.state.championStats)
  };

  componentWillReceiveProps(nextProps, context) {
    let championStats = this.findChampion(nextProps.match, nextProps.champions);
    this.getChampion(context.region, championStats)
  };

  getChampion(region, championStats) {
    fetch(window.location.href + 'get-champion/?region=' + region + '&championId=' + championStats.id)
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
          champion: data,
          championStats: championStats,
          championAvg: this.getChampionAvg(championStats)
        });
      })
      .catch((err) => {
        console.log('[ChampionTable] Fetch Error :-S', err);
      });
  };

  findChampion(match, champions) {
    return champions.find((champion) => {
      if (champion.id === match.champion) {
        return champion
      };
    });
  };

  getChampionAvg(champion) {
    let championAvg = {};
    for (var stat in champion.stats) {
      championAvg[stat] = Math.ceil(champion.stats[stat]/champion.stats['totalSessionsPlayed'])
    };
    return championAvg;
  };

  getKDA() {
    return ((this.state.championAvg.totalChampionKills + this.state.championAvg.totalAssists)/this.state.championAvg.totalDeathsPerSession).toFixed(2);
  }

  render() {
    // need some logic to render a loading page (seeing '//NaN' is ugly) as data is fetched
    return (
      <div className='three columns'>
        <table className='u-full-width'>
          <tbody>
            <tr><th>{this.state.champion.name}</th></tr>
            <tr><td>{this.state.championAvg.totalChampionKills} / {this.state.championAvg.totalDeathsPerSession} / {this.state.championAvg.totalAssists} ({this.getKDA()})</td></tr>
            <tr><td>{this.state.championAvg.totalGoldEarned}</td></tr>
            <tr><td>{this.state.championAvg.totalDamageDealt}</td></tr>
            <tr><td>{this.state.championAvg.totalPhysicalDamageDealt}</td></tr>
            <tr><td>{this.state.championAvg.totalMagicDamageDealt}</td></tr>
            <tr><td>{this.state.championAvg.totalDamageTaken}</td></tr>
            <tr><td>{this.state.championAvg.totalMinionKills}</td></tr>
            <tr><td>{this.state.championAvg.totalTurretsKilled}</td></tr>
          </tbody>
        </table>
      </div>
    );
  };

};

ChampionTable.contextTypes = {
  summonerId: React.PropTypes.string.isRequired,
  region: React.PropTypes.string.isRequired
};

export default ChampionTable;
