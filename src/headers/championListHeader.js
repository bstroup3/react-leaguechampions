import React from "react";
import style from '../mystyle.module.css'
import {Link} from 'react-router-dom'
export default function Header({onSearchChange, filter, onFilterChange}){
    return(
      <div className={style.stickyHeader}>
        <Link className={style.homeButton} to="/react-leaguechampions/">Home</Link>
        <div className={style.centerBlock}>
          <h1 className={style.header}>League of Legends Champion Viewer </h1>
          <div className={style.inputs}>
          <input type="search" placeholder="Search Champions" className={style.SearchBar} onChange={onSearchChange}/>
          <label className={style.label}>Filters: </label>
          <select className={style.typeFilter} onChange={onFilterChange}>
            <option value=""> </option>
            <option value="Fighter">Fighter</option>
            <option value="Tank">Tank</option>
            <option value="Mage">Mage</option>
            <option value="Assassin">Assassin</option>
            <option value="Marksman">Marksman</option>
            <option value="Support">Support</option>
          </select>
          </div>
        </div>
        <hr className={style.lineRow}/>
      </div>
  )
}