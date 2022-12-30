import React from "react";
import style from './mystyle.module.css'

const championAbilitiesSplash = (props) => {
    const abilityImages = props.abilities.map((spell, index) => {
        if (spell === props.currentAbility) {
            return (
                <div className="col-2" key={spell.id}>
                    <img onClick={() => props.onAbilityClick(index)}
                        src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/${spell.image.full}`}
                        alt={spell.name + " pic"} 
                        className="active-ability"/>
                </div>
            )
        }

        return (



            <div className="col-2"
                key={spell.id}><img onClick={() => props.onAbilityClick(index)}
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