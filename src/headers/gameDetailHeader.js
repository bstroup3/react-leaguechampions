import React from "react";
import style from "../mystyle.module.css"
import {Link} from 'react-router-dom'
export default function Header({username, server}){
    return(
    <Link className={style.homeButton} to={`/react-leaguechampions/profile/${username}&${server}`}>Back</Link>
    )
}