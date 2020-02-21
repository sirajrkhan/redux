import React from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngredient.module.css'

const burgerIngredient = (props) => {
    let ingredients = null;

    switch (props.type) {
        case ('bread-top'):
            ingredients = <div className={classes['BreadTop']}></div>;
            break;
        case ('seeds1'):
            ingredients = <div className={classes.Seeds1}></div>;
            break;
        case ('seeds2'):
            ingredients = <div className={classes.Seeds2}></div>;
            break;
        case ('cheese'):
            ingredients = <div className={classes.Cheese}></div>;
            break;
        case ('meat'):
            ingredients = <div className={classes.Meat}></div>;
            break;
        case ('bacon'):
            ingredients = <div className={classes.Bacon}></div>;
            break;
        case ('salad'):
            ingredients = <div className={classes.Salad}></div>;
            break;
        case ('bread-bottom'):
            ingredients = <div className={classes.BreadBottom}></div>;
            break;                              
        default:
            ingredients = null;
    }

    return ingredients;
};

export default burgerIngredient;

burgerIngredient.propTypes = {
    type: PropTypes.string.isRequired,

}