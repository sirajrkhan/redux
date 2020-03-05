import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders'

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
            bacon: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        isLoading: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKeys => {
                return ingredients[igKeys];
            })
            .reduce((sum,el) => { 
                return sum + el;
            }, 0);

        this.setState({purchasable: sum > 0});
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
        this.updatePurchaseState(updatedIngredients);
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
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing:true})
    }
    
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {
        //alert('Carry on with your purchase!!')
        this.setState({isLoading:true})
        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            customer: {
                name: 'Siraj',
                mail: 'siraj@siraj.com',
                address: {
                    street: '123 abc',
                    city: 'BLR',
                    country: 'India'
                }
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
            console.log('Response is: ', response);
            this.setState({isLoading: false, purchasing: false})
        })
        .catch(error => {
            console.log(error)
            this.setState({isLoading: false, purchasing: false})
        })
    }

    render () {
        let orderSummary = <OrderSummary 
            price={this.state.totalPrice}
            ingredients={this.state.ingredients} 
            cancelled={this.purchaseCancelHandler}
            continued={this.purchaseContinueHandler}
        />;
        if (this.state.isLoading){
            orderSummary = <Spinner />
        }
        
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0 
        }

        return(
            <Aux>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                <Burger ingred={this.state.ingredients} />
                <BuildControls 
                Disabled={disabledInfo}
                price = {this.state.totalPrice}
                more={this.addIngredientHandler}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                less={this.removeIngredientHandler} />
            </Aux>
        )
    }
}

export default BurgerBuilder;