import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'

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
        <Button btnType="Danger"  clicked={props.cancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.continued}>CONTINUE</Button>
    </Aux>)
}

export default orderSummary;