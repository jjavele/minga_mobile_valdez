import { StyleSheet, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import Home from './src/views/Home'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from './src/navigators/drawerNavigator';

export default function App() {
  return (
    <NavigationContainer>
      
      <StatusBar hidden />
      {/*<StackNavigator />*/}
      <DrawerNavigator />
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

  }
});
