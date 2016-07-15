import React from 'react';

import Message from './Message';
import SummonerSearch from './SummonerSearch';
import SummonerStats from './SummonerStats';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summonerName: '',
      summonerId: '',
      region: '',
      errorMessage: '',
      searched: false
    };
  };

  getChildContext() {
    return {
      summonerId: this.state.summonerId,
      region: this.state.region
    };
  };

  handleSearch(name, id, region, searched) {
    this.setState({
      summonerName: name,
      summonerId: id,
      region: region,
      searched: searched
    });
  };

  handleError(errorMessage) {
    this.setState({
      errorMessage: errorMessage
    });
  };

  render() {
    var content;
    if (this.state.searched === false) {
      content = <div className='row'>
        <h1>Welcome!</h1>
        <div className='row'>
          <p>Enter a League of Legends summoner name and Region to see recent Champion statistics.</p>
          <p>Currently this app only averages performance in ranked play for recent Champions.</p>
        </div>
      </div>
    } else {
      content = <SummonerStats summonerName={this.state.summonerName} summonerId={this.state.summonerId} region={this.state.region} />
    };
    if (this.state.errorMessage !== '') {
      content = <Message message={this.state.errorMessage} />
    }

    return (
      <div id='app'>
        <div className='container'>
          <SummonerSearch handleSearch={this.handleSearch.bind(this)} handleError={this.handleError.bind(this)} />
          {content}
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
