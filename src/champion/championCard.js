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
    console.log(champion)
    return (
        <div>
            <div className={style.champCard}>
                    <button onClick={() => onCardClickBack()} className={style.backTopButton}>
                        Back to Home
                    </button>
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
                        Starting Health: {stats.hp} - {stats.hpperlevel * 17 + stats.hp} ({stats.hpperlevel} per level)
                    </div>
                    <div>
                        Armor: {stats.armor} - {parseFloat(stats.armorperlevel * 17).toFixed(2) + stats.armor} ({stats.armorperlevel} per level)
                    </div>
                    <div>
                        Magic Resist: {stats.spellblock} - {stats.spellblockperlevel * 17 + stats.spellblock} ({stats.spellblockperlevel} per level)
                    </div>
                    <div>
                        Attack Damage: {Math.round(stats.attackdamage)} - {Math.round(stats.attackdamageperlevel * 17 + stats.attackdamage)} ({stats.attackdamageperlevel} per level)
                    </div>
                    <div>
                        Attack Speed: {stats.attackspeed} - {parseFloat(stats.attackspeedperlevel / 100).toFixed(4) * 17 + stats.attackspeed} ({stats.attackspeedperlevel}% per level)
                    </div>
                    <div>
                        Mana: {stats.mp} - {stats.mpperlevel * 17 + stats.mp} ({stats.mpperlevel} per level)
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
        </div>
    )
}

export default championCard;
