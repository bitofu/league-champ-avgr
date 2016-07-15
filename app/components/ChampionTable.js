import React from 'react';

class ChampionTable extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      region: context.region,
      match: this.props.match,
      champion: '',
      championStats: this.getChampionStats(this.props.champions),
      championAvg: {}
    };
  };

  componentDidMount() {
    this.getChampion();
    this.getChampionAvg(this.state.championStats);
  };

  getChampionStats(championList) {
    return championList.find((champion) => {
      if (champion.id === this.props.match.champion) {
        return champion
      };
    });
  };

  getChampion() {
    $.ajax({
      type: 'GET',
      url: 'https://global.api.pvp.net/api/lol/static-data/' + this.state.region + '/v1.2/champion/' + this.state.championStats.id + '?api_key=' + process.env.RIOT_API_KEY
    }).done((res) => {
      this.setState({
        champion: res
      });
    }).fail((res) => {
      // add error message
      console.log(res)
    });
  };

  getChampionAvg(champion) {
    let championAvg = {};
    for (var stat in champion.stats) {
      championAvg[stat] = Math.ceil(champion.stats[stat]/champion.stats['totalSessionsPlayed'])
    };
    this.setState({
      championAvg: championAvg
    });
  };

  getKDA(){
    return ((this.state.championAvg.totalChampionKills + this.state.championAvg.totalAssists)/this.state.championAvg.totalDeathsPerSession).toFixed(2);
  }

  render() {
    return (
      <div className='three columns'>
        <table className='u-full-width'>
          <tbody>
            <tr><th>{this.state.champion.name}</th></tr>
            <tr><td>{this.state.championAvg.totalGoldEarned}</td></tr>
            <tr><td>{this.state.championAvg.totalChampionKills} / {this.state.championAvg.totalDeathsPerSession} / {this.state.championAvg.totalAssists} ({this.getKDA()})</td></tr>
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
