import React from "react";

const championAbilityText = ({abilityInfo}) => {
    //console.log(abilityInfo)

    function cleanTooltip(tooltip){
        return tooltip.replace(/(<.*?>)/g, '');
    }

    function replaceScaling(text){
        var matches = text.match(/({{.*?}})/g);
        var tooltip = text;

        for (let i = 0; i < matches.length; i++) {

            // if the match was an effectburn {{ eX }}
            if (matches[i][3] === 'e') {
                tooltip = tooltip.replace(matches[i], abilityInfo.effectBurn[matches[i][4]]);
            }

            // else the match was an {{ aX }} or {{ fX }} | some of the tooltips are bugged and don't follow this format
            else {
                // matchKey determines which letter and number the match was
                let matchKey = matches[i][3] + matches[i][4];

                // loop through all the abilityInfo.vars to find which one has a key that matches matchKey
                for (let j = 0; j < abilityInfo.vars.length; j++) {
                    if (abilityInfo.vars[j].key === matchKey) {

                        // replace 
                        tooltip = tooltip.replace(matches[i], abilityInfo.vars[j].coeff + '%');
                        break;
                    }
                }
            }
        }
        return tooltip
    }

    //no scaling
    if(abilityInfo.vars.length === 0){
        const desc = abilityInfo.description
        return(
            <div className="row">
                <div className="col">
                    <h3>{abilityInfo.name}</h3>
                    <div dangerouslySetInnerHTML={{__html: desc}}/>
                    <h3>Cooldown</h3>
                    <div>{abilityInfo.cooldownBurn}</div>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className="row">
                <div className="col">
                    <h3>{abilityInfo.name}</h3>
                    {replaceScaling(cleanTooltip(abilityInfo.tooltip))}
                </div>
            </div>
        )
    }
}
export default championAbilityText