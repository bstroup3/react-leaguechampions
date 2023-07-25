import React, { useEffect, useState } from "react";
import style from './profile.module.css'
import Axios from 'axios'
import {Link} from 'react-router-dom'

export default function Match({matchId, api_key, profileId}){
    const [match, setMatch] = useState()
    useEffect(() => {
        Axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=RGAPI-${api_key}`)
        .then((response) => {
            setMatch(response.data)
        })
    },[])
    function secondsToTime(secs){
        var h = Math.floor(secs / (60 * 60));
      
        var divisor_for_minutes = secs % (60 * 60);
        var m = Math.floor(divisor_for_minutes / 60);
      
        var divisor_for_seconds = divisor_for_minutes % 60;
        var s = Math.ceil(divisor_for_seconds);
      
        return `${h?`${h}:`:""}${m?`${m}:${s}`:`${s}s`}`
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
    if(match != undefined){
        console.log(match)
        const playerTeam = match.info.participants.filter((participant) => (participant.puuid == profileId))[0].teamId
        let gameOutcome = (match.info.teams[0].teamId == playerTeam && match.info.teams[0].win == true) || (match.info.teams[1].teamId == playerTeam && match.info.teams[1].win == true) ? "Win" : "Loss" 
        gameOutcome = (match.info.gameDuration < 600) ? "Remake" : gameOutcome
        const offset = new Date(match.info.gameEndTimestamp).getTimezoneOffset()
        console.log(offset)
        const gameDate = new Date(match.info.gameEndTimestamp).toISOString().slice(0,10)
        const gameTime = new Date(match.info.gameEndTimestamp).toISOString().slice(11,16)
        const gameDuration = secondsToTime(match.info.gameDuration)
        const gameMode = queues.filter((queue) => (queue.queueId == match.info.queueId))[0].name
        return(
            <div className={style.matchContainer}>
                <h2>{gameMode}</h2>
                <h1>{gameOutcome}</h1>
                <h3>{gameDate} {gameTime}</h3>
                <h3>{gameDuration}</h3>
            </div>
        )
    }
    else{
        return(
            <h2 className={style.header}>Loading...</h2>
        )
    }
}