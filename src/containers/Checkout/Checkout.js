import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{
    state = {
        ingredients:{
            cheese: 1,
            bacon: 2,
            salad: 1,
            meat: 1
        }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        console.log('q...',query);
        const ingredients = {};
        for (let param of query.entries()){
            ingredients[param[0]] = +param[1]
        }
        this.setState({ingredients: ingredients})
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        return(
            <>
                <CheckoutSummary 
                    checkoutContinued={this.checkoutContinuedHandler}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    ingredients={this.state.ingredients} />
            </>
        )
    }
}

export default Checkout;