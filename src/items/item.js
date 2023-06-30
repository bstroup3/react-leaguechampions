import React from 'react'
import style from './items.module.css'
export default function item({itemInfo, onItemClick, version}) {
  return (
    <div className={style.item}>
        <div className={style.itemListBox} onClick={() => onItemClick(itemInfo)}>
            <img className={style.itemSquare} src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemInfo.image.full}`}
            alt={itemInfo.name + " picture"} />
            <p className={style.itemName} dangerouslySetInnerHTML={{__html: itemInfo.name.toUpperCase()}}></p>
        </div>
    </div>
  );
}