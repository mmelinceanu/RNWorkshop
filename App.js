import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Deck from './screens/Deck'
import Map from '././screens/Map'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Deck">
          <Tab.Screen name="Deck" component={Deck} options={{ title: 'Deck' }} />
          <Tab.Screen name="Map" component={Map} options={{ title: 'Map' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
