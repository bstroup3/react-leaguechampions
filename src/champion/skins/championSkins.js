import React, {Component} from "react";
import style from '../../mystyle.module.css'
import ChampionSkinsSplash from './championSkinsSplash'

class championSkins extends Component {
    constructor(props){
        super(props)

        this.state = {
            currentSelectedSkin: this.props.championData.skins[0]
        }
    }

    handleSkinClick = (index) => {
        this.setState({
            currentSelectedSkin: this.props.championData.skins[index]
        })
    }

    render(){
        return(
            <div>
                <div>
                    <ChampionSkinsSplash/>
                    {this.currentSelectedSkin.name}
                </div>

            </div>
        )
    }
}

export default championSkins