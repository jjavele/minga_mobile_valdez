import { NavigatorContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../views/Home.js'
import Mangas from '../views/Mangas.js'

const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
            title:'Minga'
        }}>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Mangas' component={Mangas}/>
    </Stack.Navigator>
  )
}

export default StackNavigator
