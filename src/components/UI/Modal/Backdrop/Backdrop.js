import React from 'react';

import classes from './Backdrop.css';

const backdrop = (props) => (
	<div className={classes.Backdrop}>{props.children}</div>
);

export default backdrop;
