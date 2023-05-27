import { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, Button, ScrollView } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import DrinkCard from '../components/DrinkCard';
import Title from '../components/Title';
import drinks from '../data/drinks.json';

function HomeScreen({ route, navigation }) {
	const [cart, setCart] = useState([]);
	const [drinksData, setDrinksData] = useState(drinks.data);
  
	function addToCartHandler(drinkItem) {
		setCart( (prevCartState) => {
			const isItemInCart = prevCartState.some(item => item.id === drinkItem.id)
			if (isItemInCart) {
				const updatedCart = prevCartState.map(item => {
					if (item.id === drinkItem.id ) {
						return { ...item, quantity: item.quantity + 1 }
					}
					else {
						return item
					}
				})
				return updatedCart
			}
			else {
				return [...prevCartState, {...drinkItem, quantity: 1}]
			}
		});
	}

	function removeFromCartHandler(drinkItem) {
		setCart((prevCartState) => {
			return prevCartState.filter((item) => item !== drinkItem)
		})
	}

	return (
		<View style={styles.rootContainer}>
			<Title>Drinks Cafe Menu</Title>
			<PrimaryButton 
				onPressBtn={() =>
					navigation.navigate('Cart', {
						onRemoveFromCart: removeFromCartHandler,
						cartDrinks: cart
					})
				}>
				View your shopping cart
			</PrimaryButton>

			<ScrollView>
			{
				drinksData &&
				drinksData.map( (drinkInfo) => <DrinkCard key={drinkInfo.id} drink={drinkInfo} routeName={route.name} onAddToCart={addToCartHandler} />)
			}
			</ScrollView>

		</View>
	)
}

export default HomeScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#038767',
	}
  });
