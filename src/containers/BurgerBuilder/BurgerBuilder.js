import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    cheese: .5,
    salad:  .3,
    bacon: .7,
    meat: 1.3
}

class BurgerBuilder extends Component{
    state = {
        ingredients : {
            cheese: 0,
            salad:  0,
            seeds1: 0,
            seeds2: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        console.log('Adding...'+type)
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    }

    removeIngredientHandler = (type) => {
        console.log('Removing...'+type)
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        // const updatedCount = (oldCount !== 0) ? oldCount - 1 : 0 ;
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceSubtraction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtraction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0 
        }

        return(
            <Aux>
                <Burger ingred={this.state.ingredients} />
                <BuildControls 
                Disabled={disabledInfo}
                price = {this.state.totalPrice}
                more={this.addIngredientHandler} 
                less={this.removeIngredientHandler} />
            </Aux>
        )
    }
}

export default BurgerBuilder;