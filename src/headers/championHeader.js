import React from "react";
import style from '../mystyle.module.css'
import {Link} from 'react-router-dom'
const header = ({champion}) => {
    return(
      <div className={style.stickyHeader}>
        <Link className={style.homeButton} to="/react-leaguechampions/champions">Back</Link>
        <h1 className={style.headerName}>{champion.name.toUpperCase()}</h1>
        <div><h2>{champion.title.charAt(0).toUpperCase() + champion.title.slice(1)}</h2></div>
        <hr className={style.lineRow}/>
      </div>
  )
  }
export default header;