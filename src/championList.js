import React from 'react'
import Champion from './champion'
import style from './mystyle.module.css'

const ChampionList = ({championsData, onChampionClick}) => {

    const ChampionListItems = championsData.map((champion) => {
        return <Champion onChampionClick={onChampionClick} key={champion.key}
            champInfo={champion} />
    })

    return (
        <div className={style.champs}>
                {ChampionListItems}
        </div>
    )
}

export default ChampionList