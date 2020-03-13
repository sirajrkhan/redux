import React, { Component } from 'react'
import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postcode: ''
        },
        isLoading: false,
        ingredients: null,

    }

    orderHandler = (event) =>{
        event.preventDefault();
        //console.log('in Order handler',this.props.ingredients);
        this.setState({isLoading:true})
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
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
            this.setState({isLoading: false})
            this.props.history.push('/')
        })
        .catch(error => {
            console.log(error)
            this.setState({isLoading: false})
        })
    }

    render(){
        const form = (this.state.isLoading) ? <Spinner /> : (
            <form>
                <input type="text" name="name" placeholder="Enter your Name" />
                <input type="email" name="email" placeholder="Enter your Email" />
                <input type="text" name="street" placeholder="Enter your Street" />
                <input type="text" name="postcode" placeholder="Enter your Postalcode" />
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

export default ContactData;