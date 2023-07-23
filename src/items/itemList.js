import React,{ useState } from "react";
import style from "./items.module.css"
import Header from "../headers/itemListHeader"
import Item from "./item"


export default function ItemList({itemsData, searchfield, onSearchChange, version}){
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
        const [filter, setFilter] = useState("")
        function onFilterChange(e){
            setFilter(e.target.value)
        }  
        const ItemListItems = itemsData.filter(
            (item) => (item.inStore != false) && 
            (item.maps['11'] == true) &&
            (item.requiredChampion != "Sylas"))
            .sort((a,b) => a.gold.total > b.gold.total ? 1 : -1).map((item) => {
            if((item.name.toLowerCase()).includes(searchfield.toLowerCase()) && (filter == "" || item.tags.some(tag => tag == filter))){
                return <Item key={item.name}
                    itemInfo={item} version={version}/>
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
                <Header onSearchChange={onSearchChange} filter={filter} onFilterChange={onFilterChange}/>
                </div>
                <div>
                {
                    <div className={style.items}>
                        {ItemListItems}
                    </div>
                }
                </div>
            </div>
        )
}