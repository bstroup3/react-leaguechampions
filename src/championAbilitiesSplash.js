import React from "react";
import style from './mystyle.module.css'

const championAbilitiesSplash = (props) => {
    const abilityImages = props.abilities.map((spell, index) => {
        if (spell === props.currentAbility) {
            return (
                <div className={style.champSplash} key={spell.id}>
                    <img onClick={() => props.onAbilityClick(index)}
                        src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/${spell.image.full}`}
                        alt={spell.name + " pic"} 
                        className={style.champImage}/>
                </div>
            )
        }

        return (



            <div className={style.champSplash}
                key={spell.id}><img className={style.champImage} onClick={() => props.onAbilityClick(index)}
                    src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/${spell.image.full}`}
                    alt={spell.name + " pic"} />
            </div>
        );
    })

    return (
        <div className="row">
            {abilityImages}
        </div>
    )
}
export default championAbilitiesSplash