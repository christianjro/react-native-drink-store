import { View, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import DrinkCard from '../components/DrinkCard';
import Title from '../components/Title';
import PrimaryButton from '../components/PrimaryButton';

function CartScreen({ route, navigation }) {
    return (
        <View style={styles.rootContainer}>
            <Title>Your Cart</Title>
            <PrimaryButton onPressBtn={ () => navigation.navigate("Home") }>Continue Shopping</PrimaryButton>
            <ScrollView>
            {
                route.params.cartDrinks.map( (addedDrink) => <DrinkCard key={addedDrink.id} drink={addedDrink} routeName={route.name} onRemoveFromCart={route.params.onRemoveFromCart} />)
            }
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