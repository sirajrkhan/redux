import React from 'react';
import classes from './Logo.module.css'
import BurgerImage from '../../assets/images/burger-logo.png'

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={BurgerImage} alt="The name of company" />
    </div>
)

export default logo;
