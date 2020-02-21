import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

class BurgerBuilder extends Component{
    state = {
        ingredients : {
            cheese: 2,
            salad:  1,
            seeds1: 1,
            seeds2: 1,
            bacon: 1,
            meat: 1
        }
    }

    render () {
        return(
            <Aux>
                <Burger ingred={this.state.ingredients} />
                <BuildControls />
            </Aux>
        )
    }
}

export default BurgerBuilder;