import React from 'react'
import style from '../mystyle.module.css'
import {Link} from 'react-router-dom'

export default function champion({champInfo, onChampionClick, version}) {
  return (
    <div className={style.champ}>
        <Link to={`/champions/${champInfo.name}`} className={style.champListBox} onClick={() => onChampionClick(champInfo)}>
            <img className={style.championSquare} src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champInfo.image.full}`}
            alt={champInfo.name + " picture"} />
            <p className={style.champName}>{champInfo.name.toUpperCase()}</p>
        </Link>
    </div>
  );
}
