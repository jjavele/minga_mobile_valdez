import { createDrawerNavigator } from '@react-navigation/drawer'
import { StyleSheet, StatusBar } from 'react-native';
import Home from '../views/Home.js'
import Register from '../views/Register.js'
import Login from '../views/Login.js'
import Mangas from '../views/Mangas.js'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
        <Drawer.Screen name='Home' component={Home} options={{ headerShown: false }}/>
        <Drawer.Screen name='Register' component={Register}/>
        <Drawer.Screen name='Login' component={Login}/>
        <Drawer.Screen name='Mangas' component={Mangas}/>
    </Drawer.Navigator>
  )
}

export default DrawerNavigator