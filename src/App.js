
import React,{ Component } from 'react';
import ChampionList from './champion/championList'
import Axios from 'axios'
import ChampionCard from './champion/championCard'
import style from './mystyle.module.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./home/home"
import ItemList from "./items/itemList"

class App extends Component{

  constructor(props){
    super(props)

    this.state = {
        searchfield: '',
        championsData: [],
        itemsData: [],
        version: ''
    }
  }

  axiosCalls() {
    const CHAMPION_DATA_URL = `https://ddragon.leagueoflegends.com/cdn/${this.state.version}/data/en_US/champion.json`;
    const ITEM_DATA_URL = `https://ddragon.leagueoflegends.com/cdn/${this.state.version}/data/en_US/item.json`;

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

    Axios.get(ITEM_DATA_URL)
    .then(response => {
      let itemsData = []
      for (let key in response.data.data){
        itemsData.push(response.data.data[key]);
      }
      //put champ data into the state
      this.setState({itemsData: itemsData});
    })
    .catch(e =>{
      console.log(e);
    })
  }

  getVersion() {
    const versionURL = 'https://ddragon.leagueoflegends.com/api/versions.json'
  
       Axios.get(versionURL)
        .then(async response => {
          let versionVar = response.data[0]
          this.setState({ version: versionVar  }, () => {console.log("new state: " + this.state.version)})
        })
        .catch(e=> {console.log(e)})
  }
  
   componentDidMount() {
    const promise1 = new Promise((resolve) => {
      this.getVersion()
      setTimeout(() => {resolve('Success')},100)
    })
    promise1.then((value) => {
      if(value === 'Success'){
        this.axiosCalls()
      }
    }).catch(e => {console.log(e)})
    
  }

  handleChampionClick = (champInfo) => {
    let championUrl = `https://ddragon.leagueoflegends.com/cdn/${this.state.version}/data/en_US/champion/${champInfo.id}.json`
    
    Axios.get(championUrl)
    .then(response => {
      this.setState({
        currentChampionData: response.data.data[champInfo.id],
      })
    })
  }

  handleItemClick = (itemInfo) => {
    let ItemUrl = `https://ddragon.leagueoflegends.com/cdn/${this.state.version}/data/en_US/item/${itemInfo.id}.json`
    
    Axios.get(ItemUrl)
    .then(response => {
      this.setState({
        currentItemData: response.data.data[itemInfo.id]
      })
    })
  }

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value});
  }


  render() {
    window.scrollTo(0,0)
    console.log("what is going on")
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/champions" element={<ChampionList onChampionClick={this.handleChampionClick} championsData={this.state.championsData} searchfield={this.state.searchfield} version={this.state.version}/>} />
          <Route path="/champions/:currentChampionData" element={<ChampionCard/>} />
          <Route path="/items" element={<ItemList onItemClick={this.handleItemClick} itemsData={this.state.itemsData} searchfield={this.state.searchfield} version={this.state.version}/>} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
