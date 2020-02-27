import React from 'react'
import classes from './Menubar.module.css'

const menubar = (props) => {
    return(
        <div 
            className={classes.DrawerToggle}
            onClick={props.drawerToggle}
        >
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default menubar;