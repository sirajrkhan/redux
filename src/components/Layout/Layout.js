import React from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import layoutClassess from './Layout.module.css';

const layout = (props) => (
    <Aux>
        <div className={layoutClassess.topMenu}><Toolbar/></div>
        <div>SideDrawer</div>
        <main>{props.children}</main>
    </Aux>
)
export default layout;