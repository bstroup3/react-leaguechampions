import React from "react";
import style from '../mystyle.module.css'
import {Link} from "react-router-dom"
export default function Header({onSearchChange, filter, onFilterChange}){
    return(
      <div className={style.stickyHeader}>
        <Link className={style.homeButton} to="/react-leaguechampions/">Home</Link>
        <div className={style.centerBlock}>
          <h1 className={style.header}>League of Legends Item Viewer </h1>
          <div className={style.inputs}>
          <input type="search" placeholder="Search Items" className={style.SearchBar} onChange={onSearchChange}/>
          <label className={style.label}>Filters: </label>
          <select className={style.typeFilter} onChange={onFilterChange}>
            <option value=""> </option>
            <option value="Lane">Lane Starter</option>
            <option value="Jungle">Jungle Starter</option>
            <option value="Trinket">Trinkets</option>
            <option value="Consumable">Consumables</option>
            <option value="Damage">Attack Damage</option>
            <option value="CriticalStrike">Critical Strike</option>
            <option value="AttackSpeed">Attack Speed</option>
            <option value="OnHit">On Hit</option>
            <option value="ArmorPenetration">Armor Penetration</option>
            <option value="SpellDamage">Ability Power</option>
            <option value="Mana">Mana</option>
            <option value="ManaRegen">Mana Regeneration</option>
            <option value="MagicPenetration">Magic Penetration</option>
            <option value="Health">Health</option>
            <option value="HealthRegen">Health Regeneration</option>
            <option value="Armor">Armor</option>
            <option value="SpellBlock">Magic Resistance</option>
            <option value="AbilityHaste">Ability Haste</option>
            <option value="NonbootsMovement">Movement Speed</option>
            <option value="LifeSteal">LifeSteal</option>
            <option value="SpellVamp">Omnivamp</option>
          </select>
          </div>
        </div>
        <hr className={style.lineRow}/>
      </div>
  )
  }