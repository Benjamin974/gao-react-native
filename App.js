import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper'
import HomeScreen from './Home.js';
import Ordinateurs from './Ordinateurs.js';
import UsersScreen from './Users.js';

const Stack = createStackNavigator();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Users" component={UsersScreen} />
          <Stack.Screen name="Ordinateurs" component={Ordinateurs} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;