import React from "react";
import style from '../mystyle.module.css'
import {Link} from "react-router-dom"
const header = ({currentView, onCardClickBack, onSearchChange, }) => {
    return(
      <div className={style.stickyHeader}>
        <Link className={style.homeButton} to="/react-leaguechampions/">Home</Link>
        <div className={style.centerBlock}>
          <h1 className={style.header}>League of Legends Item Viewer </h1>
          <input type="search" placeholder="Search Items" className={style.SearchBar} onChange={onSearchChange}/>
        </div>
        <hr className={style.lineRow}/>
      </div>
  )
  }
export default header;