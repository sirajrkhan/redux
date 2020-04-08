import React from 'react'
import classes from './Order.module.css'

const order = (props) => {
    const ing = [];
    for (let ingName in props.ingredients){
        ing.push({
            name: ingName,
            amount: props.ingredients[ingName]
        })
    }

    const ingOut = ing.map(
        ig => (<span style={{textTransform:`capitalize`, border: `1px solid #EEE`, padding: `5px`, margin: `3px`}} key={Math.random()*107.34}> {ig.name}: {ig.amount},</span>)
    )

    return (
        <div className={classes.Order}>
            {ingOut}
            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order;