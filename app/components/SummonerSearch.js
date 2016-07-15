import React from 'react';

class SummonerSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summonerName: '',
      region: 'na'
    };
  };

  updateSummonerName(e) {
    this.setState({
      summonerName: e.target.value
    });
  };

  updateRegion(e) {
    this.setState({
      region: e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    let name = this.state.summonerName.trim().toLowerCase().replace(' ', '');
    // lowercase and strip white space
    $.ajax({
      type: 'GET',
      url: 'https://na.api.pvp.net/api/lol/' + this.state.region + '/v1.4/summoner/by-name/' + this.state.summonerName + '?api_key=' + process.env.RIOT_API_KEY
    }).done((res) => {
      this.props.handleSearch(res[name].name, res[name].id.toString(), this.state.region, true);
      this.setState({
        summonerName: ''
      });
    }).fail((res) => {
      // need to handle error better
      this.props.handleError('Summoner not found.')
    });
  };

  render() {
    return (
      <div className='row'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className='four columns'>
            <h4>Summoner Name</h4>
          </div>
          <div className='five columns'>
            <input id='summoner-name' className='u-full-width' type='text' value={this.state.summonerName} onChange={this.updateSummonerName.bind(this)} />
          </div>
          <div className='two columns'>
            <select className='u-full-width' value={this.state.region} onChange={this.updateRegion.bind(this)}>
              <option value='br'>BR</option>
              <option value='eune'>EUNE</option>
              <option value='euw'>EUW</option>
              <option value='jp'>JP</option>
              <option value='kr'>KR</option>
              <option value='lan'>LAN</option>
              <option value='las'>LAS</option>
              <option value='na'>NA</option>
              <option value='oce'>OCE</option>
              <option value='ru'>RU</option>
              <option value='tr'>TR</option>
            </select>
          </div>
          <div className='one column'>
            <input className='button-primary' type='submit' value='Search' />
          </div>
        </form>
      </div>
    );
  };

};

export default SummonerSearch;
