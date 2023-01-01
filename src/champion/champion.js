import React from 'react'
import style from '../mystyle.module.css'
export default function champion({champInfo, onChampionClick}) {
  return (
    <div className={style.champ}>
        <a className="champion-list-element" onClick={() => onChampionClick(champInfo)}>
            <img className="champion-square" src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champInfo.image.full}`}
            alt={champInfo.name + " picture"} />
            <p className={style.champName}>{champInfo.name}</p>
        </a>
    </div>
  );
}
