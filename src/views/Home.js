import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Menu from '../../assets/Menu.png'
import Logo from '../../assets/Logo.png'
import Background from '../../assets/background-image.png'
import 'react-native-gesture-handler';
import { NavigatorContainer } from '@react-navigation/native'
import Mangas from './MangasX';


const Home = (props) => {
  return (
    <ImageBackground source={Background} style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <Image source={Menu} style={styles.imagenLogo} />
        </TouchableOpacity>
        <Image source={Logo} style={styles.imagenLogo}/>
      </View>
      <View style={styles.textStyles}>
        <Text style={[styles.textWhite, styles.title ]}>Your favorite comic book store</Text>
        <Text style={[styles.textWhite, styles.subtitle]}>From classics to novelties, we have everything you need to immerse yourself in your favorite universes. Explore our catalog and live the adventure of your life.</Text>
        <TouchableOpacity style={styles.buttonHome}> 
          <Text style={styles.buttonHomeText} onPress={() =>props.navigation.navigate('Mangas')}>Let's go!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    
      },
      navbar: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10
      },
      imagenLogo: {
        height: 60,
        objectFit: 'contain',
      },
      textWhite:{
        color: 'white',
      },
      textStyles:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        gap: 32,
        paddingHorizontal: 6,
        paddingBottom: 36,
      },
      title:{
        color: '#fff',
        fontFamily: 'Roboto',
        fontSize: 40,
        fontStyle: 'normal',
        textAlign: 'center',
        fontWeight: '700' 
      },
      subtitle:{
        color: '#fff',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontStyle: 'normal',
        textAlign: 'center',
        fontWeight: '400'
      },
      buttonHome: {
        display: 'flex',
        width: 363,
        paddingVertical: 16,
        paddingHorizontal: 36,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 50000,
        backgroundColor: '#4338CA',
        marginTop: 10,
      },
      buttonHomeText:{
        color: '#fff',
        fontFamily: 'Roboto',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '700',
    
      },
})