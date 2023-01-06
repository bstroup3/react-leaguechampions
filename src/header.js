import React from "react";
import style from './mystyle.module.css'
const header = ({currentView, onCardClickBack, onSearchChange, }) => {
  if(currentView === 'champion-card'){
    return(
      <div className={style.stickyHeader}>
        <div className={style.centerBlock}>
          <h1 className={style.header}>League of Legends Champion Viewer </h1>
          <button onClick={() => onCardClickBack()} className={style.backHeaderButton}>
            Back to Home
          </button>
        </div>
        <hr className={style.lineRow}/>
      </div>
    )
  }
  else{
    return(
      <div className={style.stickyHeader}>
        <div className={style.centerBlock}>
          <h1 className={style.header}>League of Legends Champion Viewer </h1>
          <input type="search" placeholder="Search Champions" className={style.SearchBar} onChange={onSearchChange}/>
        </div>
        <hr className={style.lineRow}/>
      </div>
  )
  }
}
export default header;