import React, { Component } from 'react'
import {connect} from 'react-redux';
import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        street: '',
        postcode: '',
        isLoading: false,
        ingredients: null
    }

    orderHandler = (event) => {
        event.preventDefault();
        //console.log('in Order handler',this.props.ingredients);
        this.setState({isLoading:true})
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            customer: {
                name: this.state.name,
                email: this.state.email,
                address: {
                    street: this.state.street,
                    postcode: this.state.postcode
                }
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
        .then(response => {
            this.setState({isLoading: false})
            this.props.history.push('/Orders')
        })
        .catch(error => {
            console.log(error)
            this.setState({isLoading: false})
        })
    }

    nameUpdateHandler = (event) => {
        this.setState(
            {name: event.target.value}
        )
    }
    emailUpdateHandler = (event) => {
        this.setState(
            {email: event.target.value}
        )
    }
    streetUpdateHandler = (event) => {
        this.setState(
            {street: event.target.value}
        )
    }
    postcodeUpdateHandler = (event) => {
        this.setState(
            {postcode: event.target.value}
        )
    }

    render(){
        const form = (this.state.isLoading) ? <Spinner /> : (
            <form>
                <input type="text" name="name" placeholder="Enter your Name" value={this.state.name} onChange={this.nameUpdateHandler} />
                <input type="email" name="email" placeholder="Enter your Email" value={this.state.email} onChange={this.emailUpdateHandler} />
                <input type="text" name="street" placeholder="Enter your Street" value={this.state.street} onChange={this.streetUpdateHandler} />
                <input type="text" name="postcode" placeholder="Enter your Postalcode" value={this.state.postcode} onChange={this.postcodeUpdateHandler} />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        )

        return(
            <div className={classes.ContactData}>
                <h2>Fill in your details</h2>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);