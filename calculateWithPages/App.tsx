import React from 'react'
import {  createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from'@react-navigation/native';

import HomeScreen from './HomeScreen'
import HistoryScreen from './HistoryScreen'

export type RootStackParamList = {
  Home: undefined
  History: { operation: Data[] }
}
export interface Data {
  content: string
}
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='History' component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
