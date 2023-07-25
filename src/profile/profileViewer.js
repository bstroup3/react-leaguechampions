import React, { useEffect, useState } from "react";
import style from "./profile.module.css"
import Header from "../headers/profileHeader"
import Axios from "axios";
import NoPage from "../nopage/noPageFound"
import Match from "./match.js"
import { redirect } from "react-router-dom";

export default function ProfileViewer({championsData, version}){
    const username = window.location.pathname.split("/")[window.location.pathname.split("/").length-1].split("&")[0]
    const server = window.location.pathname.split("/")[window.location.pathname.split("/").length-1].split("&")[1]
    const [responseCode, setResponseCode] = useState(200)
    const api_key = process.env.REACT_APP_API_KEY
    const [profile, setProfile] = useState("")
    const [championMastery, setChampionMastery] = useState()
    const [matchHistory, setMatchHistory] = useState()
    const [matches, setMatches] = useState([])
    useEffect(() => {
        Axios.get(`https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=RGAPI-${api_key}`)
        .then((response) => {
            setProfile(response.data)
            Axios.get(`https://${server}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${response.data.id}?api_key=RGAPI-${api_key}`)
            .then((response) => {
                setChampionMastery(response.data)
            })
            Axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${response.data.puuid}/ids?start=0&count=15&api_key=RGAPI-${api_key}`)
            .then((response) => {
                setMatchHistory(response.data)
            })
        })
        .catch((e) =>{
            setResponseCode(e.name)
        })
    },[])
    console.log(matches)
    if(responseCode == "AxiosError"){
        return(<NoPage/>)
    }
    else if(profile != undefined && championMastery != undefined && matchHistory != undefined){
        const preFilterChampionMastery = championMastery.slice(0,3)
        const newUsername = profile.name
        const filteredChampionMasteryName = preFilterChampionMastery.map((champion1) => {
            return <h3 className={style.masteryComponents}>{championsData.filter((champion2) => (champion1.championId == champion2.key))[0].name}<br/>Mastery Level {champion1.championLevel}<br/>{champion1.championPoints}</h3>
        })
        const filteredChampionMasteryPictureName = preFilterChampionMastery.map((champion1) => {
            return <img className={style.masteryPicture} src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championsData.filter((champion2) => (champion1.championId == champion2.key))[0].image.full}`} />
        })
        const matches = matchHistory.map((matchId) => {
            return <Match matchId={matchId} api_key={api_key} profileId={profile.puuid}/> 
        })
        return(
            <div>
                <Header username={newUsername}/>
                <h2 className={style.header}>Mastery</h2>
                <hr className={style.lineRow}/>
                <div className={style.container}>
                    <div className={style.mastery}>{filteredChampionMasteryPictureName}</div>
                    <div className={style.mastery}>
                        {filteredChampionMasteryName}
                    </div>
                </div>
                <h2 className={style.header}>Match History</h2>
                <hr className={style.lineRow}/>
                {matches}
            </div>
        )
    }
    else{
        <div>
            Loading...
        </div>
    }
}