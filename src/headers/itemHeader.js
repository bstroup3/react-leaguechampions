import React from "react";
import style from '../mystyle.module.css'
import {Link} from 'react-router-dom'
const header = ({item, picture}) => {
    return(
      <div className={style.stickyHeader}>
        <Link className={style.homeButton} to="/react-leaguechampions/items">Back</Link>
        <h1 className={style.headerName}>{item}</h1>
        <img className={style.itemPicture} src={picture} alt="item splash"/>
        <hr className={style.lineRow}/>
      </div>
  )
  }
export default header;