import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders';
import withErr from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component{
    state ={
        orders: [],
        isLoading: true
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then(
            response => {
                this.setState({isLoading:false});
                const fetchedOrders = [];
                for (let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key,
                    });
                }
                console.log('fetchedOrder: ', fetchedOrders);
                
                this.setState({orders: fetchedOrders})
            }
        )
        .catch(
            err => {
                return (
                    this.setState({isLoading:false})
                    // console.log(err)
                )
            }
        )

    }

    render(){
        // let entries = null;

        return (
            <div>
                <h2>Your Order Summary</h2>                    
                {
                    
                    this.state.orders.map(
                        order => {
                            return (
                                <> 
                                    <div key={Math.random() * 107.37}>{order.customer.name} | {order.customer.email}</div>
                                    <Order 
                                        key={order.id} 
                                        ingredients={order.ingredients} 
                                        price={order.totalPrice} />
                                </>
                            )
                        }
                    )
                }
            </div>
        )
    }
}

export default withErr(Orders,axios);