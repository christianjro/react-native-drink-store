import { View, Button, Text, Image, StyleSheet } from 'react-native';
import PrimaryButton from './PrimaryButton';

export default function DrinkCard(props) {
    return (
        <View style={styles.drinkContainer}>
            <View style={styles.drinkInner}>
                <Text style={styles.drinkName}>{props.drink.name}</Text>
                <View style={styles.drinkImg}>
                    <Image style={styles.stretch} source={{uri: 'https://via.placeholder.com/100x80'}} />
                </View>
                <Text style={styles.drinkPrice}>${props.drink.price}.00</Text>
            </View>
            <PrimaryButton onPressBtn={() => props.onAddToCart(drink)}>Add to Cart</PrimaryButton>
        </View>
    )
}

const styles = StyleSheet.create({
    drinkContainer: {
        flex: 1,
        backgroundColor: '#23cc6b',
        borderRadius: 15,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drinkImg: {
        margin: 5,
    },
    stretch: {
        width: 100,
        height: 80,
        resizeMode: 'cover'
    },
    drinkInner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drinkName: {
        fontWeight: 700,
        fontSize: 20
    },
    drinkPrice: {
        fontSize: 20

    }
});