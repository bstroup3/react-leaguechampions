import React from "react";
import style from "./home.module.css"
import {Link} from "react-router-dom"
import Logo from "../imgs/WhiteLOL.png"

export default function home(){
    console.log("if you can see me, we made it home")
    return(
        <div className={style.container}>
            <h1 className={style.HomeTitle}>Welcome to my League Of Legends Resource Website!</h1>
            <img src={Logo} alt="LOL Logo"/>
            <div className={style.Options}>
                <Link className={style.button} to="react-leaguechampions/champions">View Champions</Link>
                <Link className={style.button} to="react-leaguechampions//items">View Items</Link>
            </div>
        </div>
    )
}