import React,{ Component} from 'react'
import ChampionAbilitiesSplash from './championAbilitiesSplash';
import ChampionAbilityText from './championAbilitiesText';

class championAbilities extends Component {
  constructor(props){
    super(props)

    this.state = {
        currentSelectedAbility: this.props.championData.spells[0]
    }
  }

  handleAbilityClick = (index) => {
    this.setState({
        currentSelectedAbility: this.props.championData.spells[index]
    })
  }

  render(){
    return(
        <div className='row'>
            <div className='col'>
            <ChampionAbilitiesSplash onAbilityClick={this.handleAbilityClick} 
                currentAbility={this.state.currentSelectedAbility}
                abilities={this.props.championData.spells} version={this.props.version}/>
            <ChampionAbilityText abilityInfo={this.state.currentSelectedAbility}/>
            </div>
        </div>
    )
  }
}

export default championAbilities