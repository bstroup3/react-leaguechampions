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
        const tags = [
            {
                tag: 'Damage',
                name: 'Attack Damage'
            },
            {
                tag: 'SpellDamage',
                name: 'Ability Power'
            },
            {
                tag: 'SpellBlock',
                name: 'Magic Resist'
            },
            {
                tag: 'Armor',
                name: 'Armor'
            },
            {
                tag: 'Health',
                name: 'Health'
            },
            {
                tag: 'Tenacity',
                name: 'Tenacity'
            },
            {
                tag: 'Trinket',
                name: 'Trinket'
            },
            {
                tag: 'HealthRegen',
                name: 'Health Regen'
            },
            {
                tag: 'ManaRegen',
                name: 'Mana Regen'
            },
            {
                tag: 'Mana',
                name: 'Mana'
            },
            {
                tag: 'OnHit',
                name: 'On Hit'
            },
            {
                tag: 'AttackSpeed',
                name: 'Attack Speed'
            },
            {
                tag: 'CriticalStrike',
                name: 'Critical Strike'
            },
            {
                tag: 'MagicPenetration',
                name: 'Magic Penetration'
            },
            {
                tag: 'ArmorPenetration',
                name: 'Armor Penetration'
            },
            {
                tag: 'CooldownReduction',
                name: 'Cooldown Reduction'
            },
            {
                tag: 'Lane',
                name: 'Starter Items'
            },
            {
                tag: 'AbilityHaste',
                name: 'Ability Haste'
            },
            {
                tag: 'LifeSteal',
                name: 'Life Steal'
            },
            {
                tag: 'SpellVamp',
                name: 'Spell Vamp'
            },
            {
                tag: 'Consumable',
                name: 'Consumable'
            },
            {
                tag: 'Active',
                name: 'Active'
            },
            {
                tag: 'NonbootsMovement',
                name: 'Movement Speed'
            },
            {
                tag: 'Boots',
                name: 'Boots'
            }
        ]

        const ItemListItems = this.props.itemsData.filter(
            (item) => (item.inStore != false) && 
            (item.maps['11'] == true) &&
            (item.requiredChampion != "Sylas"))
            .sort((a,b) => a.gold.total > b.gold.total ? 1 : -1).map((item) => {
            if((item.name.toLowerCase()).includes(this.props.searchfield.toLowerCase())){
                return <Item key={item.name}
                    itemInfo={item} version={this.props.version}/>
            }
            else{
                return(
                    <div></div>
                )
            }
        })
        return(
            <div className={style.container}>
                <div className={style.stickyHeader}>
                <Header currentView = {this.state.currentView} onCardClickBack={this.handleCardClickBack} onSearchChange={this.onSearchChange}/>
                </div>
                <div>
                {
                    // tags.map((tag) =>{
                    //     const filteredItems = ItemListItems.filter((item) => (item.props.itemInfo.tags.indexOf(tag.tag) > -1))
                    //     return( 
                    //         <>
                    //         <h1 className={style.tagHeader}>{tag.name}</h1>
                    //         <div className={style.items}>
                    //             {filteredItems}
                    //         </div>
                    //         </>
                    //     )
                    // })
                    <div className={style.items}>
                        {ItemListItems}
                    </div>
                }
                </div>
            </div>
        )
    }
}

export default itemList;