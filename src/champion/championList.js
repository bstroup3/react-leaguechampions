import React, { Component } from 'react'
import Champion from './champion'
import style from '../mystyle.module.css'
import Header from '../headers/championListHeader'



class championList extends Component{
    constructor(props){
        super(props)

        this.state = {
        }
    }


    render() {
        const ChampionListItems = this.props.championsData.sort((a,b) => a.name > b.name ? 1 : -1).map((champion) => {
            if((champion.name.toLowerCase()).includes(this.props.searchfield.toLowerCase())){
                return <Champion onChampionClick={this.props.onChampionClick} key={champion.name}
                    champInfo={champion} version={this.props.version}/>
            }
            else{
                return(
                    <div></div>
                )
            }
        })

        return(
            <div className={style.container}>
                <div className={style.stickyHeader}>
                <Header currentView = {this.state.currentView} onCardClickBack={this.handleCardClickBack} onSearchChange={this.onSearchChange}/>
                </div>
                <div className={style.champs}>
                    {ChampionListItems}
                </div>
            </div>
        )
    }

}


export default championList;