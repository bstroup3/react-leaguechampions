import React from "react";
import style from '../../mystyle.module.css'

const championSkinsSplash = (props) => {
    const skinImages = props.skins.map((skin, index) => {
        //console.log(props.skins[1].name)
        console.log(`ddragon.leagueoflegends.com/cdn/img/champion/splash/${props.championData.name}_${index}.jpg`)
        if(skin === props.currentSkin) {
            return(
                <div className={style.champSkinSplash} key={skin.id}>
                    <img onClick={() => props.onSkinClick(index)}
                        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${props.championData.id}_${props.championData.skins[index].num}.jpg`}
                        alt={skin.name + ' pic'}
                        className={style.champSkinImage}/>
                </div>
            )
        }

        return (
            <div className={style.champSkinSplash} key={skin.id}>
                <img className={style.champSkinImage} onClick={() => props.onSkinClick(index)}
                        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${props.championData.id}_${props.championData.skins[index].num}.jpg`}
                        alt={skin.name}/>
                <h3>{skin.name}</h3>
            </div>
        );
    })

    return (
        <div className="row">
            {skinImages}
        </div>
    )

}
export default championSkinsSplash