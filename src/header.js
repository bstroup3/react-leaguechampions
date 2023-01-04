import React from "react";
import style from './mystyle.module.css'
const header = props => {
    return(
        <div className="col">
        <h1 className={style.header}>League of Legends Champion Viewer </h1>
        <hr className={style.lineRow}/>
      </div>
    )
}
export default header;