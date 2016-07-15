import React from 'react';

import SummonerSearch from './SummonerSearch'
import SummonerStats from './SummonerStats'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summonerName: '',
      summonerId: '',
      region: ''
    };
  };

  getChildContext() {
    return {
      summonerId: this.state.summonerId,
      region: this.state.region
    };
  };

  handleSearch(name, id, region) {
    this.setState({
      summonerName: name,
      summonerId: id,
      region: region
    });
  };

  render() {
    return (
      <div id='app'>
        <div className='container'>
          <SummonerSearch handleSearch={this.handleSearch.bind(this)} />
          <h1>{this.state.summonerName}</h1>
          <SummonerStats summonerName={this.state.summonerName} summonerId={this.state.summonerId} region={this.state.region} />
        </div>
      </div>
    );
  };

};

App.childContextTypes = {
  summonerId: React.PropTypes.string.isRequired,
  region: React.PropTypes.string.isRequired
};

export default App;
