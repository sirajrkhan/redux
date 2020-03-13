import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    cheese: .5,
    salad:  .3,
    bacon: .7,
    meat: 1.3
}

class BurgerBuilder extends Component{

    state = {
        ingredients : null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        isLoading: false
    }

    componentDidMount(){
        console.log('props',this.props);

        axios.get('/ingredients.json')
        .then(
            response => {
                console.log('Ingredients @ Server', response);
                this.setState({ingredients: response.data})
            }
        )
        .catch(
            error => {
                console.log('Something...')
            }
        )
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
        //Here's routing specific code
        const queryParam = [];
        for (let i in this.state.ingredients){
            queryParam.push(encodeURIComponent(i) +'='+ encodeURIComponent(this.state.ingredients[i]))
        }
        queryParam.push('price='+this.state.totalPrice)
        const qs = queryParam.join('&');
        console.log('query is: ',qs)
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + qs
        })
    }

    render () {
        let orderSummary = <OrderSummary 
            price={this.state.totalPrice}
            ingredients={this.state.ingredients} 
            cancelled={this.purchaseCancelHandler}
            continued={this.purchaseContinueHandler}
        />;
        if (this.state.isLoading || !this.state.ingredients){
            orderSummary = <Spinner />
        }
        
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0 
        }

        let burgerContent = (
            <>
                <Burger 
                    ingred={this.state.ingredients} />
                <BuildControls 
                    Disabled={disabledInfo}
                    price = {this.state.totalPrice}
                    more={this.addIngredientHandler}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    less={this.removeIngredientHandler} />            
            </>
        )
        if (!this.state.ingredients){
            burgerContent = <Spinner />
        }

        return(
            <Aux>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}
                    children={orderSummary} />
                {burgerContent}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);