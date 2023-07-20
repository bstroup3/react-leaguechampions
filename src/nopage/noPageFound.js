import React from 'react'
import style from './noPageFound.module.css'
import {Link} from 'react-router-dom'
import Towa from '../imgs/Towa_Emote.webp'

export default function NoPageFound() {
    return(
        <>
        <Link className={style.homeButton} to="/react-leaguechampions">Home</Link>
        <div className={style.container}>
            <h1>404 Page Not Found</h1>
            <img className={style.towa} src={Towa} alt="Towa Frog"/>
        </div>
        </>
    );
}