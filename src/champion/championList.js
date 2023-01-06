import React, { Component } from 'react'
import Champion from './champion'
import style from '../mystyle.module.css'



class TESTchampionList extends Component{
    constructor(props){
        super(props)

        this.state = {
        }
    }


    render() {
        const ChampionListItems = this.props.championsData.sort((a,b) => a.name > b.name ? 1 : -1).map((champion) => {
            console.log(this.props.searchfield)
            if((champion.name.toLowerCase()).includes(this.props.searchfield.toLowerCase())){
                return <Champion onChampionClick={this.props.onChampionClick} key={champion.name}
                    champInfo={champion} />
                }
        })

        return(
            <div className={style.champs}>
                {ChampionListItems}
            </div>
        )
    }

}


export default TESTchampionList;