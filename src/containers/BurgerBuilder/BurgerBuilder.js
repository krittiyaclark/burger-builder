import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
		// loading: false,
		// error: false,
	};

	componentDidMount() {
		console.log(this.props);
		this.props.onInitIngredient();
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	}

	// Toggler button
	purchaseHander = () => {
		this.setState({ purchasing: true });
	};

	// Closed backdrop
	purchaseCancelHander = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHander = () => {
		// alert('You are Continue');
		// this.setState({ loading: true });
		// const order = {
		// 	ingredients: this.state.ingredients,
		// 	price: this.state.totalPrice,
		// 	customer: {
		// 		name: 'Krittiya Clark',
		// 		address: {
		// 			street: 'Teststreet 1',
		// 			zipCode: '41351',
		// 			country: 'USA',
		// 		},
		// 		email: 'test@test.com',
		// 	},
		// 	deliveryMethod: 'fastest',
		// };
		// axios
		// 	.post('/orders.json', order)
		// 	.then((response) => this.setState({ loading: false, purchasing: false }))
		// 	.catch((error) => this.setState({ loading: false, purchasing: false }));
		this.props.history.push('/checkout');
	};

	render() {
		const disabledInfo = {
			...this.props.ings,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;
		let burger = this.props.error ? (
			<p>Ingredients can't be loaded!</p>
		) : (
			<Spinner />
		);

		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchasable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHander}
						price={this.props.price}
					/>
				</Aux>
			);

			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					price={this.props.price}
					purchaseCancelled={this.purchaseCancelHander}
					purchaseContinued={this.purchaseContinueHander}
				/>
			);
		}

		// {salad: true, meat: false, ...}
		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHander}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		price: state.totalPrice,
		error: state.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) =>
			dispatch(burgerBuilderActions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) =>
			dispatch(burgerBuilderActions.removeIngredient(ingName)),
		onInitIngredient: () => dispatch(burgerBuilderActions.initIngredients()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
