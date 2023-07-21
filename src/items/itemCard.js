import React, { useEffect } from "react";
import style from "./items.module.css"
import Axios from "axios";

export default function ItemCard() {


    return(
    <>
        <h1 className={style.itemHeader}>{window.location.pathname.split('/')[window.location.pathname.split('/').length-1].replaceAll("%20", " ")}</h1>
    </>
    )
}