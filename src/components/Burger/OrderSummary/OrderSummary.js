import React from 'react';
import Aux from '../../../hoc/Aux'

const orderSummary = (props) => {
    const ingredients = props.ingredients;
    const items = Object.keys(ingredients).map(
        igKeys => <li key={igKeys} > <span style={{textTransform: `capitalize`}}>{igKeys}</span> : {props.ingredients[igKeys]} </li>
    )

    return (
    <Aux>
        <h3>Order Summary</h3>
        <p>Here's the list of ingredients you added:</p>
        <ul>
            {items}
        </ul>
        <p>Continue to checkout??</p>
    </Aux>)
}

export default orderSummary;