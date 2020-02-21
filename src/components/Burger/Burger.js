import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {   
    let ingredientArr = Object.keys(props.ingred)
        .map( keysInArr => {
            return [...Array(props.ingred[keysInArr])].map( (Key,Value) => {
                return <BurgerIngredient key={keysInArr + Value} type={keysInArr} />
            })
        }
        )
        .reduce(
            (prevArr, updatedArr) => {
                return prevArr.concat(updatedArr)
            },[]);

    if(ingredientArr.length === 0) {
        ingredientArr = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredientArr}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger;

// {
//     entries.map(
//         x => {
//             return x.map(
//                 y => {
//                     console.log(y);
//                     return <BurgerIngredient type={y} />
//                 }
//             )
//         }
//     )

// }
