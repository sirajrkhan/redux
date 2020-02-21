import React from 'react'
import Aux from '../../hoc/Aux'
import layoutClassess from './Layout.module.css'

const layout = (props) => (
    <Aux>
        <div className={layoutClassess.topMenu}>Toolbar, SideDrawer, BackDrop</div>
        <main>{props.children}</main>
    </Aux>
)
export default layout;