import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import Logo from '../../assets/Logo.png'
import Inga from '../../assets/Inga.png'
import Google from '../../assets/Google.png'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SignUp = (props) => {
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigation()

  const handleSignUp = (event) => {
    event.preventDefault()
    
    if (!email || !photo || !password) {
      alert('Please enter email, photo and password.');
      return;
    }
    
    let data = {
      email: email,
      photo: photo,
      password: password,
    };
    
      axios.post("https://mingabackblueteam-production.up.railway.app/api/auth/register", data)
      .then(() => {
        alert('New user creation successful')
        props.navigation.navigate('Sign In')
      })
      .catch(function(error) {
        alert(`${error} Invalid email or user already exist`)
    })
    // Aquí puedes agregar la lógica para manejar el registro con los datos del usuario (email, photo y password).
    // Por ejemplo, puedes enviar estos datos a un servidor o almacenarlos en el dispositivo localmente.
    console.log('Email:', email);
    console.log('Photo:', photo);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logos}>
        <Image source={Logo} style={styles.imagenLogo}/>
        <Image source={Inga} style={styles.imagenLogo}/>
      </View>
      <View style={styles.texts}>
        <Text style={styles.textTitle} color={'#1F1F1F'}>Welcome!</Text>
        <Text style={styles.textSubtitle} color={'rgba(31, 31, 31, 0.75)'}>Discover manga, manhua and manhwa, track your progress, have fun, read manga.</Text>

      </View>
      <TextInput placeholder="  Email" value={email} onChangeText={text => setEmail(text)} style={styles.input}/>
      <TextInput placeholder="  Photo (URL)" value={photo} onChangeText={text => setPhoto(text)} style={styles.input}/>
      <TextInput placeholder="  Password" value={password} onChangeText={text => setPassword(text)} secureTextEntry style={styles.input}/>
      <TouchableOpacity style={styles.buttonHome}> 
          <Text style={styles.buttonSignUp} onPress={handleSignUp}>Sing up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonGoogle}>
        <Image source={Google} style={styles.imagenGoogle}/>
        <Text style={styles.textGoogle}>Sign up with Google</Text>
      </TouchableOpacity>
      <View style={styles.textlogin}>
        <Text style={styles.textlogin1}>Already have an account?</Text>
        <Text style={styles.textlogin2}>Login</Text>
      </View>
      <View style={styles.textbackhome}>
        <Text style={styles.textbackhome1}>Go back to</Text>
        <Text style={styles.textbackhome2}>home page</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 32,
  },
  logos:{
    flexDirection: 'row',
    width: 150,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 4, 
    borderColor: '#4338CA',
    paddingVertical: 4,
    marginBottom: 10,
  },
  texts:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 32,
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    fontWeight: '600',
    letterSpacing: 1.6,
    marginVertical: 5,
    fontWeight: 'bold'
  },
  textSubtitle:{
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    fontWeight: '600',
    letterSpacing: 0.6,
    marginBottom: 50,
    marginVertical: 5,
  },
  buttonSignUp:{
    height: 48,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    display: 'flex',
    paddingHorizontal: 36,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#4338CA',
    marginVertical: 10,
  },
  buttonGoogle:{
    height: 48,
    color: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    display: 'flex',
    paddingHorizontal: 36,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 10,
  },
  textlogin:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  textlogin1:{
    fontFamily: 'Roboto',
    fontSize: 14,
    marginVertical: 5,
    fontWeight: 'bold'
  },
  textlogin2:{
    fontFamily: 'Roboto',
    fontSize: 14,
    marginVertical: 5,
    marginStart: 2,
    color: '#4338CA',
    fontWeight: 'bold'
  },
  textbackhome:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  textbackhome1:{
    fontFamily: 'Roboto',
    fontSize: 14,
    marginVertical: 5,
    fontWeight: 'bold'
  },
  textbackhome2:{
    fontFamily: 'Roboto',
    fontSize: 14,
    marginVertical: 5,
    marginStart: 2,
    color: '#4338CA',
    fontWeight: 'bold'
  },


});

export default SignUp;
