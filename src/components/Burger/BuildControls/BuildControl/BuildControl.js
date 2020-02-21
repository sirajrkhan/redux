import React from 'react';
import classes from './BuildControl.module.css'

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button onClick={props.Less} className={classes.Less} disabled={props.Disabled}>Less</button>
        <button onClick={props.More} className={classes.More}>More</button>
    </div>
)

export default buildControl;