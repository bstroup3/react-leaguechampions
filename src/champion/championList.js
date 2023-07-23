import React, { useState } from 'react'
import Champion from './champion'
import style from '../mystyle.module.css'
import Header from '../headers/championListHeader'



export default function ChampionList({championsData, searchfield, onSearchChange, version}){


    const onFilterChange = (e) => {
        setFilter(e.target.value)
    }
        console.log(championsData)
        const [filter, setFilter] = useState("")
        const ChampionListItems = championsData.sort((a,b) => a.name > b.name ? 1 : -1).map((champion) => {
            if((champion.name.toLowerCase()).includes(searchfield.toLowerCase()) && (filter == "" || champion.tags.some(tag => tag == filter))){
                return <Champion key={champion.name}
                    champInfo={champion} version={version}/>
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
                <Header onSearchChange={onSearchChange} filter={filter} onFilterChange={onFilterChange}/>
                </div>
                <div className={style.champs}>
                    {ChampionListItems}
                </div>
            </div>
        )

}