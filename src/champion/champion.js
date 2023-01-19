import React from 'react'
import style from '../mystyle.module.css'
export default function champion({champInfo, onChampionClick, version}) {
  return (
    <div className={style.champ}>
        <div className="champion-list-element" onClick={() => onChampionClick(champInfo)}>
            <img className="champion-square" src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champInfo.image.full}`}
            alt={champInfo.name + " picture"} />
            <p className={style.champName}>{champInfo.name}</p>
        </div>
    </div>
  );
}
