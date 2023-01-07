import React from 'react';
import ChampionAbilities from './abilities/championAbilities';
import ChampionPassive from './passive/championPassive';
import ChampionSkins from './skins/championSkins';
import style from '../mystyle.module.css';


const championCard = ({currentChampionData, onCardClickBack}) => {
    let champion = currentChampionData;
    if (!currentChampionData) {
        return (
            <div>Loading</div>
        )
    }


    const loadingSplashUrl = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`
    const stats = champion.stats;
    console.log(stats.attackspeedperlevel)
    console.log(champion)
    return (
        <>
            <div className={style.champCard}>
                <div className={style.champSplashBorderRight}>
                    <img className={style.champBorderingImage} src={loadingSplashUrl} alt="champion splash" />
                </div>
                <div className="col-8">
                    <div><h1>{champion.name}</h1></div>
                    <div><h2>{champion.title.charAt(0).toUpperCase() + champion.title.slice(1)}</h2></div>
                    <div dangerouslySetInnerHTML={{__html: champion.lore}}/>
                    <br/>

                    <h2>Stats</h2>
                    <div>
                        Starting Health: {stats.hp} - {Math.round(stats.hpperlevel * 17 * 10000)/10000 + stats.hp} ({stats.hpperlevel} per level)
                    </div>
                    <div>
                        Armor: {stats.armor} - {Math.round(stats.armorperlevel * 17 * 10000)/10000 + stats.armor} ({stats.armorperlevel} per level)
                    </div>
                    <div>
                        Magic Resist: {stats.spellblock} - {Math.round(stats.spellblockperlevel * 17 * 10000)/10000 + stats.spellblock} ({stats.spellblockperlevel} per level)
                    </div>
                    <div>
                        Attack Damage: {Math.round(stats.attackdamage)} - {Math.round(stats.attackdamageperlevel * 17 * 10000 + stats.attackdamage)/10000} ({stats.attackdamageperlevel} per level)
                    </div>
                    <div>
                        Attack Speed: {stats.attackspeed} - {parseFloat(Math.round((stats.attackspeedperlevel / 100) * 17 * 10000)/10000 + stats.attackspeed).toFixed(4)} ({stats.attackspeedperlevel}% per level)
                    </div>
                    <div>
                        Mana: {stats.mp} - {parseFloat(stats.mpperlevel * 17) + stats.mp} ({stats.mpperlevel} per level)
                    </div>
                    <div>
                        Movement Speed: {stats.movespeed}
                    </div>

                    <h2>Passive</h2>
                    {<ChampionPassive championData={champion}/>}
                    <br/>
                    <h2>Abilities</h2>
                    <ChampionAbilities championData={champion}/>
                    <h2>Skins</h2>
                    <br/>
                    <ChampionSkins championData={champion}/>
                    
                </div>
                <div className={style.champSplashBorderLeft}>
                    <img className={style.champBorderingImage} src={loadingSplashUrl} alt="champion splash" />
                </div>
            </div>
        </>
    )
}

export default championCard;
