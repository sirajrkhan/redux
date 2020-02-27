import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Menubar from '../Menubar/Menubar'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Menubar drawerToggle={props.drawerToggle} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
)

export default toolbar;