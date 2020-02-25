import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'

const controls = [
    {label: 'Cheese', type: 'cheese'},
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {
            controls.map( 
                ctrl => <BuildControl 
                            Less={() => props.less(ctrl.type)} 
                            More={() => props.more(ctrl.type)} 
                            Disabled={props.Disabled[ctrl.type]} 
                            key={ctrl.type} 
                            label={ctrl.label} 
                        />
            )
        }
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
            >ORDER NOW</button>
    </div>
)

export default buildControls;