import React,{useEffect, useState} from "react";
import Axios from "axios";
import Header from "../headers/gameDetailHeader"
import style from "./gameDetails.module.css"

export default function GameDetails({profileId, gameDetails, participants, championsData, version}){
    const [players, setPlayers] = useState()
    const api_key = process.env.REACT_APP_API_KEY
    const username = window.location.pathname.split('/')[window.location.pathname.split('/').length-2].split('&')[0]
    const server = window.location.pathname.split('/')[window.location.pathname.split('/').length-2].split('&')[1]


    useEffect(() => {

    },[])
    function secondsToTime(secs) {
        var h = Math.floor(secs / (60 * 60));

        var divisor_for_minutes = secs % (60 * 60);
        var m = Math.floor(divisor_for_minutes / 60);

        var divisor_for_seconds = divisor_for_minutes % 60;
        var s = Math.ceil(divisor_for_seconds);
        s = s > 10 ? s : "0"+s

        return `${h ? `${h}:` : ""}${m ? `${m}:${s}` : `${s}s`}`
    }
    

    if(participants != undefined && profileId != undefined && gameDetails != undefined){
        const playerTeam = gameDetails.info.participants.filter((participant) => (participant.puuid == profileId))[0].teamId

        let gameOutcome = (gameDetails.info.teams[0].teamId == playerTeam && gameDetails.info.teams[0].win == true) || (gameDetails.info.teams[1].teamId == playerTeam && gameDetails.info.teams[1].win == true) ? "Victory" : "Defeat"
        gameOutcome = (gameDetails.info.gameDuration < 600) ? "Remake" : gameOutcome

        const gameDuration = secondsToTime(gameDetails.info.gameDuration)

        const participant = "coSrXAcg5slXT_2bcBOpRcyKbrpbT0TzDYzBwlEKdWZvPYN6VDz0MRYWJywE5aBgd7FgKhH2jf8aHw" 
        console.log(gameDetails.info.participants.filter((participant1) => (participant1.puuid == participant)))//[gameDetails.info.participants.indexOf((participant2) => participant2.puuid == participant)])
        //console.log(participants.filter((participant) => (gameDetails.info.participants[gameDetails.info.participants.indexOf((participant2) => participant2.puuid == participant)] == participant)))
        const team1 = gameDetails.info.participants.filter((participant) => (participants.filter((participant1) => (participant1.puuid == participant)) && participant.teamId == playerTeam)).map((participant) => {
            const champLevel = participant.champLevel
            const kills = participant.kills
            const deaths = participant.deaths
            const assists = participant.assists
            const totalMinionsKilled = participant.totalMinionsKilled
            const totalNeutralMinionsKilled = participant.neutralMinionsKilled
            const creepScore = totalMinionsKilled + totalNeutralMinionsKilled
            const totalDamageDealt = participant.totalDamageDealt
            return(
                <div className={style.playerStats}>
                    <h4 className={style.champLevel}>{champLevel}</h4>
                    <img className={style.champPicture} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championsData.filter((champion) => (champion.key == participant.championId))[0].image.full}`} />
                    <h4 className={style.playerName}>{participant.summonerName}</h4>
                    <h4 className={style.statLine}>{kills} / {deaths} / {assists}</h4>
                    <h4 className={style.creepScore}>{creepScore}</h4>
                    <h4 className={style.creepScore}>{totalDamageDealt}</h4>
                </div>
            ) 
        })
        const team2 = gameDetails.info.participants.filter((participant) => (participants.filter((participant1) => (participant1.puuid == participant)) && participant.teamId != playerTeam)).map((participant) => {
            const champLevel = participant.champLevel
            const kills = participant.kills
            const deaths = participant.deaths
            const assists = participant.assists
            const totalMinionsKilled = participant.totalMinionsKilled
            const totalNeutralMinionsKilled = participant.neutralMinionsKilled
            const creepScore = totalMinionsKilled + totalNeutralMinionsKilled
            const totalDamageDealt = participant.totalDamageDealt
            return(
                <div className={style.playerStats}>
                    <h4 className={style.champLevel}>{champLevel}</h4>
                    <img className={style.champPicture} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championsData.filter((champion) => (champion.key == participant.championId))[0].image.full}`} />
                    <h4 className={style.playerName}>{participant.summonerName}</h4>
                    <h4 className={style.statLine}>{kills} / {deaths} / {assists}</h4>
                    <h4 className={style.creepScore}>{creepScore}</h4>
                    <h4 className={style.creepScore}>{totalDamageDealt}</h4>
                </div>
            ) 
        })
    
        return(
            <div>
                <Header username={username} server={server}/>
                <div>
                    <div className={style.gameOutcome}>
                        <h1>{gameOutcome}</h1>
                        <h2>{gameDuration}</h2>
                    </div>
                    <div className={style.teams}>
                        <div className={style.team1}>
                            {team1}
                        </div>
                        <div className={style.team2}>
                            {team2}
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
    else{
        return <h1>Loading...</h1>
    }
}