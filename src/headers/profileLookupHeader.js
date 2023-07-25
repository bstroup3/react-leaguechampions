import React from "react";
import style from "../mystyle.module.css"
import {Link} from 'react-router-dom'
export default function Header(){
    return(
    <Link className={style.homeButton} to="/react-leaguechampions/">Home</Link>
    )
}