import { View, StyleSheet, ScrollView } from 'react-native';
import { useContext } from 'react';
import DrinkCard from '../components/DrinkCard';
import Title from '../components/Title';
import PrimaryButton from '../components/PrimaryButton';
import { AppContext } from '../AppContext';

function CartScreen({ route, navigation }) {
    const { cart, removeFromCart } = useContext(AppContext)

    function removeFromCartHandler(drinkItem) {
        removeFromCart(drinkItem)
    }
    
    const cartItems = cart.map((addedDrink) => (
        <DrinkCard 
            key={addedDrink.id} 
            drink={addedDrink} 
            routeName={route.name} 
            onRemoveFromCart={removeFromCartHandler} 
        />
    ))

    return (
        <View style={styles.rootContainer}>
            <Title>Your Cart</Title>
            <PrimaryButton onPressBtn={ () => navigation.navigate("Home") }>
                Continue Shopping
            </PrimaryButton>
            
            <ScrollView testID="cartContainer">
                {cartItems}
            </ScrollView>
        </View>
    )
}

export default CartScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#038767',
    }
  });