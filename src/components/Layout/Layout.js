import React from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
	<Aux>
		<Toolbar />
		<div className={classes.Content}>Toolbar, SideDrawer, Backdrop</div>
		<main>{props.children}</main>
	</Aux>
);

export default layout;
