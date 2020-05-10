import React from 'react';

import classes from './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map((igKey) => {
			console.log(igKey); //salad, bacon, cheese, meat
			return [...Array(props.ingredients[igKey])].map((_, i) => {
				return <BurgerIngredient key={igKey + i} type={igKey} />;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []); // [] if there is no ingredients

	console.log(transformedIngredients);
	// Show message if there is no ingredients
	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients!</p>;
	}
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type='bread-top' />
			{transformedIngredients}
			<BurgerIngredient type='bread-bottom' />
		</div>
	);
};

export default burger;
