import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Drinks Cafe'}}
        />
        <Stack.Screen 
          name="Cart" 
          component={CartScreen}
          options={{title: 'Cart'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
