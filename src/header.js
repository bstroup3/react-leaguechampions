import React from "react";
import style from './mystyle.module.css'
const header = props => {
  if(props.currentView === 'champion-card'){
    return(
      <div className={style.header}>
        <div className={style.centerBlock}>
          <h1 className={style.header}>League of Legends Champion Viewer </h1>
          <button onClick={() => props.onCardClickBack()} className={style.backHeaderButton}>
            Back to Home
          </button>
        </div>
        <hr className={style.lineRow}/>
      </div>
    )
  }
  else{
    return(
      <div className={style.header}>
        <div className={style.centerBlock}>
          <h1 className={style.header}>League of Legends Champion Viewer </h1>
          <input type="text" placeholder="Search" className={style.SearchBar}/>
        </div>
        <hr className={style.lineRow}/>
      </div>
  )
  }
}
export default header;