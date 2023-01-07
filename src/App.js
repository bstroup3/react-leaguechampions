
import React,{ Component } from 'react';
import ChampionList from './champion/championList'
import Axios from 'axios'
import ChampionCard from './champion/championCard'
import Header from './header'
import style from './mystyle.module.css'

const CHAMPION_DATA_URL = 'https://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/champion.json';

class App extends Component{

  constructor(props){
    super(props)

    this.state = {
        currentView: "champion-list",
        currentChampionData: '',
        searchfield: '',
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
    let championUrl = `https://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/champion/${champInfo.id}.json`
    
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

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value});
  }


  render() {
    window.scrollTo(0,0)
    if (this.state.currentView === 'champion-card') {
      return (
        <div className={style.container}>
          <div className={style.stickyHeader}>
            <Header currentView = {this.state.currentView} onCardClickBack={this.handleCardClickBack} onSearchChange={this.onSearchChange}/>
          </div>   
          <ChampionCard onCardClickBack={this.handleCardClickBack} currentChampionData={this.state.currentChampionData} className={style.champCard}/>
        </div>
       );
    }

    return (
      <div className="container">
        <div className={style.stickyHeader}>
          <Header currentView = {this.state.currentView} onCardClickBack={this.handleCardClickBack} onSearchChange={this.onSearchChange}/>
        </div>          
        <ChampionList onChampionClick={this.handleChampionClick} championsData={this.state.championsData} searchfield={this.state.searchfield}/>
      </div>
      
    );
  }
}

export default App;
