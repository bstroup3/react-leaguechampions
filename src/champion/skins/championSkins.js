
import React, {Component} from "react";
//import style from '../../mystyle.module.css'
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
        console.log(this.props.championData)
        return(
            <div className="row">
                <div className="col">
                    <ChampionSkinsSplash  onSkinClick={this.handleSkinClick} 
                    currentSelectedSkin={this.state.currentSelectedSkin}
                    skins = {this.props.championData.skins}
                    championData = {this.props.championData}/>
                    {this.currentSelectedSkin}
                </div>

            </div>
        )
    }
}

export default championSkins