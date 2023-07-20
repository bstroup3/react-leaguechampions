import React,{ Component } from "react";
import style from "./items.module.css"
import Header from "../headers/itemHeader"
import Item from "./item"


class itemList extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render() {
        const ItemListItems = this.props.itemsData.filter(
            (item) => (item.inStore != false) && 
            (item.maps['11'] == true) &&
            (item.requiredChampion != "Sylas"))
            .sort((a,b) => a.gold.total > b.gold.total ? 1 : -1).map((item) => {
            if((item.name.toLowerCase()).includes(this.props.searchfield.toLowerCase())){
                return <Item onItemClick={this.props.onItemClick} key={item.name}
                    itemInfo={item} version={this.props.version}/>
            }
            else{
                return(
                    <div></div>
                )
            }
        })
        console.log(this.props.itemsData)
        return(
            <div className={style.container}>
                <div className={style.stickyHeader}>
                <Header currentView = {this.state.currentView} onCardClickBack={this.handleCardClickBack} onSearchChange={this.onSearchChange}/>
                </div>
                <div>
                {
                    ItemListItems.map((item) => {
                        console.log(item.props.itemInfo)
                    })
                }
                </div>
                <div className={style.items}>
                    {ItemListItems}
                </div>
            </div>
        )
    }
}

export default itemList;