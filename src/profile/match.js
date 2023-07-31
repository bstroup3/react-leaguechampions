import React, { useEffect, useState } from "react";
import style from './profile.module.css'
import Axios from 'axios'
import { Link } from 'react-router-dom'

export default function Match({ matchId, api_key, profileId, championsData, version, onGameDetailLoad}) {
    const [match, setMatch] = useState()
    const [items, setItems] = useState()
    useEffect(() => {
        Axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=RGAPI-${api_key}`)
            .then((response) => {
                setMatch(response.data)
            })
        Axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`)
        .then((response) => {
            setItems(response.data)
        })
    }, [])
    function secondsToTime(secs) {
        var h = Math.floor(secs / (60 * 60));

        var divisor_for_minutes = secs % (60 * 60);
        var m = Math.floor(divisor_for_minutes / 60);

        var divisor_for_seconds = divisor_for_minutes % 60;
        var s = Math.ceil(divisor_for_seconds);
        s = s > 10 ? s : "0"+s

        return `${h ? `${h}:` : ""}${m ? `${m}:${s}` : `${s}s`}`
    }
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
    if (match != undefined && items != undefined) {
        console.log(match)
        const playerTeam = match.info.participants.filter((participant) => (participant.puuid == profileId))[0].teamId
        let gameOutcome = (match.info.teams[0].teamId == playerTeam && match.info.teams[0].win == true) || (match.info.teams[1].teamId == playerTeam && match.info.teams[1].win == true) ? "Victory" : "Defeat"
        gameOutcome = (match.info.gameDuration < 600) ? "Remake" : gameOutcome
        const date = new Date(match.info.gameEndTimestamp).toLocaleString()
        const gameDate = date.slice(0, 10)
        const gameTime = date.slice(11, 15)
        const gameTimeSequence = date.slice(18, 29)
        const gameDuration = secondsToTime(match.info.gameDuration)
        const gameMode = queues.filter((queue) => (queue.queueId == match.info.queueId))[0].name
        const champPicture = championsData.filter((champion) => (champion.key == match.info.participants.filter((participant) => (participant.puuid == profileId))[0].championId))[0].image.full
        const kills = match.info.participants.filter((participant) => (participant.puuid == profileId))[0].kills
        const deaths = match.info.participants.filter((participant) => (participant.puuid == profileId))[0].deaths
        const assists = match.info.participants.filter((participant) => (participant.puuid == profileId))[0].assists
        const team1 = match.info.queueId == 1700 ?
            match.info.participants.slice(0, 4).map((participant) => {
                return (
                    <div className={style.participants}> 
                        <img className={style.miniImage} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championsData.filter((champion) => (champion.key == participant.championId))[0].image.full}`}/>
                        <h4 className={style.playerNames}>{championsData.filter((champion) => (champion.key == participant.championId))[0].name}</h4>
                    </div>
                )            }) :
            match.info.participants.slice(0, 5).map((participant) => {
                return (
                    <div className={style.participants}>
                        <img className={style.miniImage} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championsData.filter((champion) => (champion.key == participant.championId))[0].image.full}`}/>
                        <h4 className={style.playerNames}>{championsData.filter((champion) => (champion.key == participant.championId))[0].name}</h4>
                    </div>
                )
            })
        const team2 = match.info.queueId == 1700 ?
            match.info.participants.slice(4, 9).map((participant) => {
                return (
                    <div className={style.participants}>
                        <img className={style.miniImage} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championsData.filter((champion) => (champion.key == participant.championId))[0].image.full}`}/>
                        <h4 className={style.playerNames}>{championsData.filter((champion) => (champion.key == participant.championId))[0].name}</h4>
                    </div>
                )            }) :
            match.info.participants.slice(5, 10).map((participant) => {
                return (
                    <div className={style.participants}>
                        <img className={style.miniImage} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championsData.filter((champion) => (champion.key == participant.championId))[0].image.full}`}/>
                        <h4 className={style.playerNames}>{championsData.filter((champion) => (champion.key == participant.championId))[0].name}</h4>
                    </div>
                )            
            })
            const playerItems = match.info.participants.filter((participant) => (participant.puuid == profileId)).map((participant) => {
                let item0 = 0
                let item1 = 0
                let item2 = 0
                let item3 = 0
                let item4 = 0
                let item5 = 0
                let item6 = 0
                if(participant.item0 == 0){
                    item0 = 7050
                }
                else{
                    item0 = participant.item0
                }
                if(participant.item1 == 0){
                    item1 = 7050
                }
                else{
                    item1 = participant.item1
                }
                if(participant.item2 == 0){
                    item2 = 7050
                }
                else{
                    item2 = participant.item2
                }
                if(participant.item3 == 0){
                    item3 = 7050
                }
                else{
                    item3 = participant.item3
                }
                if(participant.item4 == 0){
                    item4 = 7050
                }
                else{
                    item4 = participant.item4
                }
                if(participant.item5 == 0){
                    item5 = 7050
                }
                else{
                    item5 = participant.item5
                }
                if(participant.item6 == 0){
                    item6 = 7050
                }
                else{
                    item6 = participant.item6
                }
                return(
                    <div className={style.itemList}>
                            <img className={style.itemImage} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item0}.png`}/> 
                            <img className={style.itemImage} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item1}.png`}/> 
                            <img className={style.itemImage} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item2}.png`}/> 
                            <img className={style.itemImage} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item3}.png`}/> 
                            <img className={style.itemImage} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item4}.png`}/> 
                            <img className={style.itemImage} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item5}.png`}/> 
                            <img className={style.tricketImage} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item6}.png`}/> 
                    </div>
                );
            })
            if(gameOutcome == "Victory"){
                return (
                    <div className={style.outterMatchContainer}>
                        <Link to={`${match.metadata.matchId}`} onClick={() => onGameDetailLoad(profileId, match, match.metadata.participants)} className={style.winMatchContainer}>
                            <div className={style.left}>
                                <h2>{gameMode}</h2>
                                <h1>{gameOutcome}</h1>
                                <h4>{gameDate} {gameTime}{gameTimeSequence}</h4>
                                <h3>{gameDuration}</h3>
                            </div>
                            <div className={style.champPicture}>
                                <img className={style.picture} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champPicture}`} />
                            </div>
                            <div className={style.playerAndItems}>
                                <div className={style.statline}>
                                    <h1>{kills} / {deaths} / {assists}</h1>
                                </div>
                                <div className={style.items}>
                                    {playerItems}
                                </div>
                            </div>
                            <div className={style.players}>
                                <div className={style.team1}>
                                    {team1}
                                </div>
                                <div className={style.team2}>
                                    {team2}
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            }
            else if(gameOutcome == "Defeat"){
                return (
                    <div className={style.outterMatchContainer}>
                        <Link to={`${match.metadata.matchId}`} onClick={() => onGameDetailLoad(profileId, match, match.metadata.participants)} className={style.lossMatchContainer}>
                            <div className={style.left}>
                                <h2>{gameMode}</h2>
                                <h1>{gameOutcome}</h1>
                                <h4>{gameDate} {gameTime}{gameTimeSequence}</h4>
                                <h3>{gameDuration}</h3>
                            </div>
                            <div className={style.champPicture}>
                                <img className={style.picture} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champPicture}`} />
                            </div>
                            <div className={style.playerAndItems}>
                                <div className={style.statline}>
                                    <h1>{kills} / {deaths} / {assists}</h1>
                                </div>
                                <div className={style.items}>
                                    {playerItems}
                                </div>
                            </div>
                            <div className={style.players}>
                                <div className={style.team1}>
                                    {team1}
                                </div>
                                <div className={style.team2}>
                                    {team2}
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            }
            else{
                return (
                    <div className={style.outterMatchContainer}>
                        <Link to={`${match.metadata.matchId}`} onClick={() => onGameDetailLoad(profileId, match, match.metadata.participants)} className={style.remakeMatchContainer}>
                            <div className={style.left}>
                                <h2>{gameMode}</h2>
                                <h1>{gameOutcome}</h1>
                                <h4>{gameDate} {gameTime}{gameTimeSequence}</h4>
                                <h3>{gameDuration}</h3>
                            </div>
                            <div className={style.champPicture}>
                                <img className={style.picture} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champPicture}`} />
                            </div>
                            <div className={style.playerAndItems}>
                                <div className={style.statline}>
                                    <h1>{kills} / {deaths} / {assists}</h1>
                                </div>
                                <div className={style.items}>
                                    {playerItems}
                                </div>
                            </div>
                            <div className={style.players}>
                                <div className={style.team1}>
                                    {team1}
                                </div>
                                <div className={style.team2}>
                                    {team2}
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            }
            
    }
    else {
        return (
            <h2 className={style.header}>Loading...</h2>
        )
    }
}