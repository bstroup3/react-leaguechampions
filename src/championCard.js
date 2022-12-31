import React from 'react';
import ChampionAbilities from './championAbilities';
import style from './mystyle.module.css';


const championCard = ({currentChampionData, onCardClickBack}) => {
    let champion = currentChampionData;
    if (!currentChampionData) {
        return (
            <div>Loading</div>
        )
    }


    const loadingSplashUrl = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`
    const stats = champion.stats;
    const skins = champion.skins;
    // console.log(skins);
    return (
        <div className="container">
            <div className={style.champCard}>
                <div className={style.champSplashBorderRight}>
                    <img src={loadingSplashUrl} alt="champion splash" />
                </div>
                <div className="col-8">
                    <div><h1>{champion.name}</h1></div>
                    <div><h2>{champion.title.charAt(0).toUpperCase() + champion.title.slice(1)}</h2></div>

                    {/* Stats */}
                    <div>
                        Armor: {stats.armor}
                    </div>
                    <div>
                        Armor per Level: {stats.armorperlevel}
                    </div>
                    <div>
                        Attack Damage: {Math.round(stats.attackdamage)} - {Math.round(stats.attackdamageperlevel * 18 + stats.attackdamage)} ({stats.attackdamageperlevel} per level)
                    </div>
                    <br/>
                    <h2>Abilities</h2>
                    {/* <div className="row"> */}
                        <ChampionAbilities championData={champion}/>
                    {/* </div> */}
                    
                    <button onClick={() => onCardClickBack()} className={style.backButton}>
                        Back
                    </button>
                </div>
                <div className={style.champSplashBorderLeft}>
                    <img src={loadingSplashUrl} alt="champion splash" />
                </div>
            </div>
        </div>
    )
}

export default championCard;
