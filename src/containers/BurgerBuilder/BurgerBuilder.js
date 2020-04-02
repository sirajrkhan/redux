import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// const INGREDIENT_PRICES = {
//     cheese: .5,
//     salad:  .3,
//     bacon: .7,
//     meat: 1.3
// }

class BurgerBuilder extends Component{

    state = {
        // ingredients : null,
        // totalPrice: 4,
        // purchasable: false,
        purchasing: false,
        isLoading: false
    }

    componentDidMount(){
        console.log('props',this.props);

        // axios.get('/ingredients.json')
        // .then(
        //     response => {
        //         console.log('Ingredients @ Server', response);
        //         this.setState({ingredients: response.data})
        //     }
        // )
        // .catch(
        //     error => {
        //         console.log('Something...')
        //     }
        // )
    }

    isItPurchasable = () => {
        //reduce will sum all the values
        const total = Object.values(this.props.ings).reduce((sum,el) => { 
            return sum + el;
        }, 0);
        return (total > 0) ? true : false;

        /**** 
            * I loved simpler below *
            let i = 0;
            Object.values(this.props.ings).map( value => (i = i + value) );
            return (i > 0) ? true : false;
        ****/
    }

    purchaseHandler = () => {
        this.setState({purchasing:true})
    }
    
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render () {
        let orderSummary = <OrderSummary 
            price={this.props.price}
            ingredients={this.props.ings} 
            cancelled={this.purchaseCancelHandler}
            continued={this.purchaseContinueHandler}
        />;
        if (this.state.isLoading || !this.props.ings){
            orderSummary = <Spinner />
        }
        
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0 
        }

        let burgerContent = (
            <>
                <Burger 
                    ingred={this.props.ings} />
                <BuildControls 
                    Disabled={disabledInfo}
                    price = {this.props.price}
                    purchasable={this.isItPurchasable()}
                    ordered={this.purchaseHandler}
                    more={this.props.onIngredientAdded}
                    less={this.props.onIngredientRemoved} />            
            </>
        )
        if (!this.props.ings){
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (type) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: type}),
        onIngredientRemoved: (type) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: type})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));