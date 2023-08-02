import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { StyleSheet, StatusBar, Image, View, Text } from 'react-native';
import { useState, useEffect } from 'react'
import Home from '../views/Home.js'
import SignUp from '../views/SignUp.js'
import SignIn from '../views/SignIn.js'
import Mangas from '../views/Mangas.js'
import SignOut from '../views/SignOut.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getStoredUserInfo = async () => {
  try {
    // Obtener el token almacenado en AsyncStorage.
    const token = await AsyncStorage.getItem('token');
    
    // Obtener el objeto de usuario almacenado en AsyncStorage.
    const userJSON = await AsyncStorage.getItem('user');
    const user = JSON.parse(userJSON); // Parsear la cadena JSON a un objeto JavaScript.

    // Hacer algo con el token y el objeto de usuario.
    console.log('Token:', token);
    console.log('User:', user);
    
    // Devolver el token y el objeto de usuario para usarlos en otras partes de tu aplicación.
    return { token, user };
  } catch (error) {
    console.log(error.message);
    // Manejar el error apropiadamente, si es necesario.
    return null;
  }
};

const CustomDrawerContent = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserFromStorage = async () => {
      const storedUser = await getStoredUserInfo();
      console.log(storedUser)
      setUser(storedUser?.user || null)
    };
    getUserFromStorage();
  }, [props])

  const clearStoredUserInfo = async () => {
    try {
      // Eliminar el token almacenado en AsyncStorage.
      await AsyncStorage.removeItem('token');
      // Eliminar el objeto de usuario almacenado en AsyncStorage.
      await AsyncStorage.removeItem('user');
      alert('User Logged out');
      console.log('AsyncStorage clean sucessfully');
    } catch (error) {
      console.log('Error al limpiar AsyncStorage:', error.message);
    }
  };
  
  const handleLogout = async () => {
    // Limpia los datos del usuario al cerrar sesión
    await clearStoredUserInfo();
    setUser(null); // Establece el usuario a null para actualizar el contenido del drawer
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: user?.photo }} style={styles.userPhoto} />
        <Text style={styles.userName}>{user?.email}</Text>
      </View>
      <DrawerItemList {...props} />
      {user?.photo ? <DrawerItem label="Sign Out" onPress={handleLogout} /> : null}
      
    </DrawerContentScrollView>
  );
};


const isLoggedIn = async () => {
  const user = await AsyncStorage.getItem('user')
  return user;
};

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {

    return(
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name='Home' component={Home} options={{ headerShown: false }}/>
        <Drawer.Screen name='Mangas' component={Mangas}/>
        <Drawer.Screen name='Sign Up' component={SignUp}/>
        <Drawer.Screen name='Sign In' component={SignIn}/>
      </Drawer.Navigator>
    )
}

export default DrawerNavigator

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});