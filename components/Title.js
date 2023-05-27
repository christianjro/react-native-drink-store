import { StyleSheet, Text, View } from 'react-native';

export default function Title(props) {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: 'white',
        padding: 12,
        marginVertical: 25
    },
    titleText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 700
    }
  });