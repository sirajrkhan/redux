import React from 'react'
import classes from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {
    let conditionalClasses = [classes.SideDrawer, (props.open ? classes.Open : classes.Close)].join(' ')
    return (
        <>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={conditionalClasses}>
                <Logo />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    )
}

export default sideDrawer;