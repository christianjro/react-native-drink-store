import { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, Button, ScrollView } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import DrinkCard from '../components/DrinkCard';
import Title from '../components/Title';
import drinks from '../data/drinks.json';
import { AppContext } from '../AppContext';

function HomeScreen({ route, navigation }) {
	const [drinksData, setDrinksData] = useState(drinks.data)
	const { addToCart } = useContext(AppContext)
  
	function addToCartHandler(drinkItem) {
		addToCart(drinkItem)
	}

	return (
		<View style={styles.rootContainer}>
			<Title>Drinks Cafe Menu</Title>
			<PrimaryButton 
				onPressBtn={() => navigation.navigate('Cart')}>
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
