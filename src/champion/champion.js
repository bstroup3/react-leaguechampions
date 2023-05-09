import React from 'react'
import style from '../mystyle.module.css'
export default function champion({champInfo, onChampionClick, version}) {
  return (
    <div className={style.champ}>
        <div className="champion-list-element" onClick={() => onChampionClick(champInfo)}>
            <img className={style.championSquare} src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champInfo.image.full}`}
            alt={champInfo.name + " picture"} />
            <p className={style.champName}>{champInfo.name.toUpperCase()}</p>
        </div>
    </div>
  );
}
