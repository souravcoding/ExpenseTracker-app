import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import * as firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import AddItems from './Components/AddItems';
import Profile from './Components/Profile';

var firebaseConfig = {
  apiKey: "AIzaSyADo_HMAuMWBdWc4HqyJo8P6YT5VQX20qM",
  authDomain: "expense-tracker-b13f5.firebaseapp.com",
  projectId: "expense-tracker-b13f5",
  storageBucket: "expense-tracker-b13f5.appspot.com",
  messagingSenderId: "276742236197",
  appId: "1:276742236197:web:75cd7a885f22698f2f77cc",
  measurementId: "G-SLLEPS55Q8"
};

if(firebase.apps.length===0){
  firebase.initializeApp(firebaseConfig)
}

const stack=createStackNavigator()

export default function App() {
  const [loading,setLoading]=useState(true)
  const [loggedIn,SetLoggedIn]=useState(false)

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        setLoading(false)
        SetLoggedIn(true)
      }else{
        setLoading(false)
        SetLoggedIn(false)
      }
    })
  })

  if(loading){
    return <View style={styles.container}>
    <ActivityIndicator color="black" size='large' />
    </View>
  }

  if(!loggedIn){
    return  <Provider store={store}>
    <NavigationContainer>
    <stack.Navigator initialRouteName='login'>
    <stack.Screen component={Login} name='login' options={{headerShown:false}}/>
    <stack.Screen component={SignUp} name='signUp' options={{headerShown:false}} />
    </stack.Navigator>
    </NavigationContainer>
    </Provider> 
  }

  return (
    <Provider store={store}>
    <NavigationContainer >
    <stack.Navigator  initialRouteName='home'>
    <stack.Screen component={Home} name='home' 
    options={{ 
      headerTintColor:'white',
      headerTitle:'Expense Tracker',
      headerStyle:{
      backgroundColor:'#00203FFF'
    }
    
    }}  />
     <stack.Screen component={AddItems} name='add' 
    options={{ 
      headerTintColor:'white',
      headerTitle:'Add New Item',
      headerStyle:{
      backgroundColor:'#00203FFF'
    }
    
    }}  />
      <stack.Screen component={Profile} name='profile' 
    options={{
      headerTintColor:'white', 
      headerTitle:'Profile',
      headerStyle:{
      backgroundColor:'#00203FFF'
    }
    
    }}  />

    </stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
