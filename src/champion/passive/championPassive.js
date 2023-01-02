import React from "react";
import style from '../../mystyle.module.css'



const championPassive = (championData) => {
    const passive = championData.championData.passive
    const desc = passive.description
    return(
        <div>
            <h3>{passive.name}</h3>
            <img className={style.passiveImage} src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/passive/${passive.image.full}`} alt={passive.name + 'pic'}/><br/>
            <div dangerouslySetInnerHTML={{__html: desc}}/>
        </div>
    )
}
export default championPassive