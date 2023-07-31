import React, { useEffect, useState } from "react";
import style from "./profile.module.css"
import Header from "../headers/profileHeader"
import Axios from "axios";
import NoPage from "../nopage/noPageFound"
import Match from "./match.js"
import { Link } from "react-router-dom";

export default function ProfileViewer({championsData, version, onGameDetailLoad}){
    const username = window.location.pathname.split("/")[window.location.pathname.split("/").length-1].split("&")[0]
    const server = window.location.pathname.split("/")[window.location.pathname.split("/").length-1].split("&")[1]
    const [responseCode, setResponseCode] = useState(200)
    const api_key = process.env.REACT_APP_API_KEY
    const [profile, setProfile] = useState("")
    const [championMastery, setChampionMastery] = useState()
    const [matchHistory, setMatchHistory] = useState()
    const [matches, setMatches] = useState([])
    const [ranks, setRanks] = useState([])
    useEffect(() => {
        Axios.get(`https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=RGAPI-${api_key}`)
        .then((response) => {
            setProfile(response.data)
            Axios.get(`https://${server}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${response.data.id}?api_key=RGAPI-${api_key}`)
            .then((response) => {
                setChampionMastery(response.data)
            })
            Axios.get(`https://${server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${response.data.id}?api_key=RGAPI-${api_key}`)
            .then((response) => {
                setRanks(response.data)
            })
            Axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${response.data.puuid}/ids?start=0&count=15&api_key=RGAPI-${api_key}`)
            .then((response) => {
                setMatchHistory(response.data)
            })
        })
        .catch((e) =>{
            setResponseCode(e)
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
            let championPoints = 0
            if(champion1.championPoints > 999999){
                championPoints = champion1.championPoints.toString().slice(0,1) + "." + champion1.championPoints.toString().slice(1,2) + "M"
            }
            else if(champion1.championPoints > 99999){
                championPoints = champion1.championPoints.toString().slice(0,3) + "k"
            }
            else if(champion1.championPoints > 9999){
                championPoints = champion1.championPoints.toString().slice(0,2) + "k"
            }
            else{
                championPoints = champion1.championPoints
            }
            return <h3 className={style.masteryComponents}>{championsData.filter((champion2) => (champion1.championId == champion2.key))[0].name}<br/>Mastery Level {champion1.championLevel}<br/>{championPoints}</h3>
        })
        const filteredChampionMasteryPictureName = preFilterChampionMastery.map((champion1) => {
            return <img className={style.masteryPicture} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championsData.filter((champion2) => (champion1.championId == champion2.key))[0].image.full}`} />
        })
        const matches = matchHistory.map((matchId) => {
            return <Match matchId={matchId} api_key={api_key} profileId={profile.puuid} championsData={championsData} version={version} onGameDetailLoad={onGameDetailLoad}/> 
        })
        return(
            <div>
                <Header username={newUsername} ranks={ranks}/>
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