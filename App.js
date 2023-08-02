import React from 'react';
import { Provider } from 'react-redux';
import {store} from './src/redux/store.js';
import { StyleSheet, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import Home from './src/views/Home'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from './src/navigators/drawerNavigator';
import { FlashMessage } from 'react-native-flash-message';

export default function App() {
  return (
    <Provider store={store}> 
      <NavigationContainer>
        <StatusBar hidden />
        <DrawerNavigator />
      </NavigationContainer>
    </Provider>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

  }
});
