import React, { useEffect, useState } from "react";
import style from "./items.module.css"
import Axios from "axios";
import {Link} from 'react-router-dom'
import ItemHeader from "../headers/itemHeader"

export default function ItemCard() {
    const [items, setItems] = useState({})
    const [version, setVersion] = useState("")
    const [item, setItem] = useState()
    const [count, setCount] = useState(0)

    useEffect(() => {
        Axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
        .then(response => {
        setVersion(response.data[0])
        Axios.get(`https://ddragon.leagueoflegends.com/cdn/${response.data[0]}/data/en_US/item.json`)
        .then(response => {
            setItems(response.data.data)
        })
        })
    },[])

    useEffect(() =>{
        for(const key in items){
            if(items[key].name == window.location.pathname.split('/')[window.location.pathname.split('/').length-1].replaceAll("%20", " ")){
                setItem(items[key])
            }
        }
    },[items])


    if(items == undefined || item == undefined){
        return(
            <div className={style.champCard}>
                <h1>Loading...</h1>
            </div>
        )
    }
    else{
        if(item.into == undefined){
            return(
                <div className={style.cardContainer}>
                    <ItemHeader item={item.name} picture={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`}/>
                    <h2>Item Description: <br/> {item.plaintext}</h2>
                    <h2>Stats</h2>            
                    <div dangerouslySetInnerHTML={{__html: item.description}}></div>
                </div>
                )
        }
        else{
            return(
                <div className={style.cardContainer}>
                    <ItemHeader item={item.name} picture={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`}/>
                    <h2>Item Description: <br/> {item.plaintext}</h2>
                    <h2>Stats</h2>            
                    <div dangerouslySetInnerHTML={{__html: item.description}}></div>
                    <h2>Builds Into:</h2>
                    <div className={style.buildInto}>
                    {
                        item.into.map((key) => {
                            return (
                            <Link reloadDocument to={`/react-leaguechampions/items/${items[key].name}`} className={style.buildsIntoCard}>
                                <img className={style.buildsIntoImage} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${items[key].image.full}`} alt={`${items[key].name} pic`}/> 
                                <div className={style.potentialItems}>{items[key].name}</div>
                            </Link>
                            )
                        })
                    }
                    </div>
                </div>
                )
        }
    }
}