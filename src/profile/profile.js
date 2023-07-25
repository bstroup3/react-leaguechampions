import React,{useState} from "react"
import style from "./profile.module.css"
import Header from "../headers/profileLookupHeader"
import {Link, redirect, Form} from "react-router-dom"

export default function Profile({searchfield, onSearchChange}){
    const [filter, setFilter] = useState("na1")
        function onFilterChange(e){
            setFilter(e.target.value)
        }  
    return(
        <div>
            <Header />
            <div className={style.container}>
            <h1>Profile Look-up</h1>
            <Form action={`/react-leaguechampions/profile/${searchfield}&${filter}`} className={style.inputs}>
                <input type="search" placeholder="Search Summoners" onChange={onSearchChange} className={style.SearchBar}/>
                <select defaultValue="na1" onChange={onFilterChange}>
                    <option value="br1">BR</option>
                    <option value="eun1">EUN</option>
                    <option value="euw1">EUW</option>
                    <option value="jp1">JP</option>
                    <option value="kr">KR</option>
                    <option value="la1">LA1</option>
                    <option value="la2">LA2</option>
                    <option value="na1">NA</option>
                    <option value="oc1">OC</option>
                    <option value="tr1">TR</option>
                    <option value="ru">RU</option>
                    <option value="ph2">PH</option>
                    <option value="sg2">SG</option>
                    <option value="th2">TH</option>
                    <option value="tw2">TW</option>
                    <option value="vn2">VN</option>
                </select>
            </Form>
            </div>
        </div>
    );
}