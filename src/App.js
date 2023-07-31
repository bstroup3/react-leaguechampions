
import React,{ Component, version } from 'react';
import ChampionList from './champion/championList'
import Axios from 'axios'
import ChampionCard from './champion/championCard'
import style from './mystyle.module.css'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Home from "./home/home"
import ItemList from "./items/itemList"
import ItemCard from './items/itemCard';
import Profile from './profile/profile'
import NoPageFound from './nopage/noPageFound';
import ProfileViewer from './profile/profileViewer';
import GameDetails from './profile/gameDetails';

class App extends Component{

  constructor(props){
    super(props)

    this.state = {
        searchfield: '',
        championsData: [],
        itemsData: [],
        version: '',
        gameDetails: {},
        participants: [],
        profileId: ""
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

  onGameDetailLoad = (profileId ,gameDetails, participants) => {
    this.setState({
      profileId: profileId,
      gameDetails: gameDetails,
      participants: participants
    })
  }

  render() {
    window.scrollTo(0,0);
    const router = createBrowserRouter([
      {
        path: "/react-leaguechampions/",
        element: <Home/>,
      },
      {
          path: "/react-leaguechampions/champions",
          element: <ChampionList championsData={this.state.championsData} searchfield={this.state.searchfield} onSearchChange={this.onSearchChange} version={this.state.version}/>
      },
      {
        path: "/react-leaguechampions/champions/:currentChampionData",
        element: <ChampionCard/>
      },
      {
        path: "/react-leaguechampions/items",
        element: <ItemList itemsData={this.state.itemsData} searchfield={this.state.searchfield} onSearchChange={this.onSearchChange} version={this.state.version}/>
      },
      {
        path: "/react-leaguechampions/items/:itemData",
        element: <ItemCard />
      },
      {
        path: "/react-leaguechampions/profile",
        element: <Profile searchfield={this.state.searchfield} onSearchChange={this.onSearchChange}/>
      },
      {
        path: "/react-leaguechampions/profile/:username",
        element: <ProfileViewer championsData={this.state.championsData} version={this.state.version} onGameDetailLoad={this.onGameDetailLoad}/>
      },
      {
        path: "/react-leaguechampions/profile/:username/:matchId",
        element: <GameDetails profileId={this.state.profileId} championsData={this.state.championsData} gameDetails={this.state.gameDetails} participants={this.state.participants} version={this.state.version}/>
      },
      {
        path: "/*",
        element: <NoPageFound/>
      }
    ]);
    return(
      <RouterProvider router={router}/>
    )
  }
}

export default App;
