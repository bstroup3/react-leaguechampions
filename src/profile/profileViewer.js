import React, { useEffect, useState } from "react";
import style from "./profile.module.css"
import Header from "../headers/profileHeader"
import Axios from "axios";
import NoPage from "../nopage/noPageFound"
import { redirect } from "react-router-dom";

export default function ProfileViewer({championsData, version}){
    const username = window.location.pathname.split("/")[window.location.pathname.split("/").length-1].split("&")[0]
    const server = window.location.pathname.split("/")[window.location.pathname.split("/").length-1].split("&")[1]
    const [responseCode, setResponseCode] = useState(200)
    const api_key = "RGAPI-c808d5b0-8d99-4921-87ca-87ace980e604"
    const [profile, setProfile] = useState("")
    const [championMastery, setChampionMastery] = useState()
    useEffect(() => {
        Axios.get(`https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${api_key}`)
        .then((response) => {
            setProfile(response.data)
            Axios.get(`https://${server}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${response.data.id}?api_key=${api_key}`)
            .then((response) => {
                setChampionMastery(response.data)
            })
        })
        .catch((e) =>{
            setResponseCode(e.name)
        })
    },[])
    if(responseCode == "AxiosError"){
        return(<NoPage/>)
    }
    else if(profile != undefined && championMastery != undefined){
        const id = profile.id
        const accountId = profile.accountId
        const puuid = profile.puuid
        const preFilterChampionMastery = championMastery.slice(0,3)
        const newUsername = profile.name
        console.log(championMastery.slice(0,3))
        const filteredChampionMasteryName = preFilterChampionMastery.map((champion1) => {
            console.log(champion1)
            return <h3 className={style.masteryComponents}>{championsData.filter((champion2) => (champion1.championId == champion2.key))[0].name}<br/>Mastery Level {champion1.championLevel}<br/>{champion1.championPoints}</h3>
         })
         const filteredChampionMasteryPictureName = preFilterChampionMastery.map((champion1) => {
            return <img className={style.masteryPicture} src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championsData.filter((champion2) => (champion1.championId == champion2.key))[0].image.full}`} />
         })
         console.log(filteredChampionMasteryPictureName)
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
            </div>
        )
    }
    else{
        <div>
            Loading...
        </div>
    }
}