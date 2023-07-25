import React from "react";
import style from '../mystyle.module.css'
import {Link} from 'react-router-dom'

export default function Header({username}){
    return(
        <div className={style.stickyHeader}>
            <Link className={style.homeButton} to="/react-leaguechampions/profile">Back</Link>
            <h1 className={style.profileHeader}>Summoner Name: <br/>{username}</h1>
            <hr className={style.lineRow}/>
        </div>
    )
}