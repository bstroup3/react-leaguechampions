import React from "react";
import style from '../mystyle.module.css'
import {Link} from 'react-router-dom'

export default function Header({username, ranks}){
    const rank = ranks.filter((rank) => (rank.queueType == "RANKED_SOLO_5x5"))
    
    if(rank.length > 0){
        return(
            <div className={style.stickyHeader}>
                <Link className={style.homeButton} to="/react-leaguechampions/profile">Back</Link>
                <h1 className={style.profileHeader}>{username}</h1>
                <hr className={style.partialLine}></hr>
                <h1 className={style.profileHeader}>{rank[0].tier} {rank[0].rank} {rank[0].leaguePoints} LP</h1>
                <h3 className={style.profileHeader}>{rank[0].wins}W {rank[0].losses}L</h3>
                <hr className={style.lineRow}/>
            </div>
        )
    }
    else{
        return(
            <div className={style.stickyHeader}>
                <Link className={style.homeButton} to="/react-leaguechampions/profile">Back</Link>
                <h1 className={style.profileHeader}>{username}</h1>
                <hr className={style.partialLine}></hr>
                <h1 className={style.profileHeader}>Unranked</h1>
                <hr className={style.lineRow}/>
            </div>
        )
    }
}