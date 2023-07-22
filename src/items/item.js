import React, {useState} from 'react'
import style from './items.module.css'
import {Link} from 'react-router-dom'
export default function Item({itemInfo, version}) {
  const [likeList, setLikeList] = useState('')

  const statlist = [
    {
      statname: "FlatPhysicalDamageMod",
      realname: "Attack Damage"
    },
    {
      statname: "FlatHPPoolMod",
      realname: "Health"
    },
    {
      statname: "PercentAttackSpeedMod",
      realname: "Attack Speed"
    },
    {
      statname: "FlatMagicDamageMod",
      realname: "Ability Power"
    },
    {
      statname: "PercentLifeStealMod",
      realname: "Percent Life Steal"
    },
    {
      statname: "FlatHPRegenMod",
      realname: "Health Regen"
    },
    {
      statname: "FlatSpellBlockMod",
      realname: "Magic Resist"
    },
    {
      statname: "FlatArmorMod",
      realname: "Armor"
    },
    {
      statname: "FlatMPPoolMod",
      realname: "Mana"
    },
    {
      statname: "FlatMovementSpeedMod",
      realname: "Movement Speed"
    },
    {
      statname: "FlatCritChanceMod",
      realname: "Critical Chance"
    },
    {
      statname: "PercentMovementSpeedMod",
      realname: "Percent Movement Speed"
    },
    {
      statname: "PercentAttackSpeedMod",
      realname: "Percent Attack Speed"
    }
  ]

  const handleLeave=()=>{
    return setLikeList("")
  }
  const handleHover=()=>{
    let stats = ""
    for(const key in itemInfo.stats){
      for(const stat in statlist){
        if(key == statlist[stat].statname){
          stats += `${statlist[stat].realname}: ${itemInfo.stats[key]}<br>`
          break
        }
      }
    }
    return setLikeList(`Gold: ${itemInfo.gold.total}<br>Stats:<br>${stats}`)
  }
  if(likeList == ""){
    return (
      <>
          <div className={style.item} onMouseOver={handleHover} onMouseLeave={handleLeave}>
            <Link className={style.itemListBox} to={`/react-leaguechampions/items/${itemInfo.name}`}>
                <img className={style.itemSquare} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemInfo.image.full}`}
                alt={itemInfo.name + " picture"} />
                <p className={style.itemName} dangerouslySetInnerHTML={{__html: itemInfo.name.toUpperCase()}}></p>
            </Link>
          </div>
      </>
    );
  }
  else{
    return (
      <>
          <div className={style.item} onMouseOver={handleHover} onMouseLeave={handleLeave}>
            <Link className={style.itemListBox} to={`/react-leaguechampions/items/${itemInfo.name}`}>
                <img className={style.itemSquare} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemInfo.image.full}`}
                alt={itemInfo.name + " picture"} />
                <p className={style.itemName} dangerouslySetInnerHTML={{__html: itemInfo.name.toUpperCase()}}></p>
            </Link>
            <Link to={`/react-leaguechampions/items/${itemInfo.name}`} className={style.likes__list} dangerouslySetInnerHTML={{__html: likeList}}></Link>
          </div>
      </>
    );
  }
}