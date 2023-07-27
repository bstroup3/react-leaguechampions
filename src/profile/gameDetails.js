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

        const queues = [
            {
                queueId: 1700,
                name: "Arena"
            },
            {
                queueId: 420,
                name: "Ranked Solo"
            },
            {
                queueId: 430,
                name: "Blind"
            },
            {
                queueId: 440,
                name: "Ranked Flex"
            },
            {
                queueId: 450,
                name: "ARAM"
            },
            {
                queueId: 700,
                name: "Clash"
            },
            {
                queueId: 720,
                name: "ARAM Clash"
            },
            {
                queueId: 400,
                name: "Draft"
            }
        ]

        const gameMode = queues.filter((queue) => (queue.queueId == gameDetails.info.queueId))[0].name
        const team1 = gameDetails.info.participants.filter((participant) => (participants.filter((participant1) => (participant1.puuid == participant)) && participant.teamId == playerTeam)).map((participant) => {
            const champLevel = participant.champLevel
            const kills = participant.kills
            const deaths = participant.deaths
            const assists = participant.assists
            const totalMinionsKilled = participant.totalMinionsKilled
            const totalNeutralMinionsKilled = participant.neutralMinionsKilled
            const creepScore = totalMinionsKilled + totalNeutralMinionsKilled
            const totalDamageDealt = participant.totalDamageDealtToChampions
            const totalDamageTaken = participant.totalDamageTaken
            const totalGold = participant.goldEarned
            return(
                <div className={style.playerStats}>
                    <h4 className={style.champLevel}>{champLevel}</h4>
                    <img className={style.champPicture} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championsData.filter((champion) => (champion.key == participant.championId))[0].image.full}`} />
                    <h4 className={style.playerName}>{participant.summonerName}</h4>
                    <h4 className={style.statLine}>{kills} / {deaths} / {assists}</h4>
                    <h4 className={style.creepScore}>{creepScore}</h4>
                    <h4 className={style.statLine}>{totalDamageDealt}</h4>
                    <h4 className={style.statLine}>{totalDamageTaken}</h4>
                    <h4 className={style.statLine}>{totalGold}</h4>
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
            const totalDamageDealt = participant.totalDamageDealtToChampions
            const totalDamageTaken = participant.totalDamageTaken
            const totalGold = participant.goldEarned
            return(
                <div className={style.playerStats}>
                    <h4 className={style.champLevel}>{champLevel}</h4>
                    <img className={style.champPicture} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championsData.filter((champion) => (champion.key == participant.championId))[0].image.full}`} />
                    <h4 className={style.playerName}>{participant.summonerName}</h4>
                    <h4 className={style.statLine}>{kills} / {deaths} / {assists}</h4>
                    <h4 className={style.creepScore}>{creepScore}</h4>
                    <h4 className={style.statLine}>{totalDamageDealt}</h4>
                    <h4 className={style.statLine}>{totalDamageTaken}</h4>
                    <h4 className={style.statLine}>{totalGold}</h4>
                </div>
            ) 
        })
    
        return(
            <div>
                <Header username={username} server={server}/>
                <div className={style.container}>
                    <div className={style.gameOutcome}>
                        <h1>{gameOutcome}</h1>
                        <h2>{gameMode}</h2>
                        <h2>{gameDuration}</h2>
                    </div>
                    <div className={style.teams}>
                        <div className={style.team1}>
                            <div className={style.teamHeader}>
                                <h2 className={style.headerSpacer}>Team 1</h2>
                                <h2></h2>
                                <h3 className={style.creepScore}>CS</h3>
                                <h3 className={style.statLineHeader}>Damage Dealt</h3>
                                <h3 className={style.statLineHeader}>Damage Taken</h3>
                                <h3 className={style.statLineHeader}>Gold Earned</h3>
                            </div>
                            {team1}
                        </div>
                        <div className={style.team2}>
                            <div className={style.teamHeader}>
                                <h2>Team 2</h2>
                            </div>
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