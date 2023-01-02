
import React,{ Component } from 'react';
import ChampionList from './champion/championList'
import Axios from 'axios'
import ChampionCard from './champion/championCard'
import style from './mystyle.module.css'

const CHAMPION_DATA_URL = 'https://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/champion.json';

class App extends Component{

  constructor(props){
    super(props)

    this.state = {
        currentView: "champion-list",
        currentChampionData: '',
        championsData: []
    }
  }

  componentDidMount() {
    Axios.get(CHAMPION_DATA_URL)
    .then(response => {
      let championsData = []
      for (let key in response.data.data){
        championsData.push(response.data.data[key]);
      }
      //put champ data into the state
      this.setState({championsData: championsData});
    })
    .catch(e =>{
      console.log(e);
    })
  }

  handleChampionClick = (champInfo) => {
    let championUrl = `http://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/champion/${champInfo.id}.json`
    
    Axios.get(championUrl)
    .then(response => {
      this.setState({
        currentChampionData: response.data.data[champInfo.id],
        currentView: 'champion-card'
      })
    })
    
  }

  handleCardClickBack = () => {
    this.setState({
      currentView: 'champion-list',
      currentChampionData: ''
    })
  }

  render() {
    if (this.state.currentView === 'champion-card') {
      window.scrollTo(0,0)
      return (
        <ChampionCard onCardClickBack={this.handleCardClickBack} currentChampionData={this.state.currentChampionData}/>
      );
    }

    return (
      <div className="container">
        <div className="row add-margin-bottom15px">
          <div className="col">
            <h1 className={style.header}>League of Legends Champion Viewer </h1>
          </div>
        </div>
        <ChampionList onChampionClick={this.handleChampionClick} championsData={this.state.championsData} />
      </div>
      
    );
  }
}

export default App;
