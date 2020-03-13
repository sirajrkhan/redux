import React from 'react';
import classess from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = () => (
    <ul className={classess.NavigationItems}>
        <NavigationItem link="/" exact active>Burgers</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
)

export default navigationItems;