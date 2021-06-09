import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text,TouchableOpacity,Image,TextInput,Button ,StyleSheet,KeyboardAvoidingView} from 'react-native'
import {Avatar} from 'react-native-elements'
import firebase from 'firebase'
import 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { getIncome, getUser, testIncome } from '../Redux/Action'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Summary from './Summary'
import chart from './chart'
import Overview from './Overview'
import {Ionicons,FontAwesome5} from '@expo/vector-icons'
import color from 'color'
import Profile from './Profile'
const Home = ({navigation}) => {

    const [income,setIncome]=useState(null)
    const [input,setInput]=useState('')
    const dispatch=useDispatch()
    const userData=useSelector(state=>state.user)
    const salary=useSelector(state=>state.income)
    const Tab=createBottomTabNavigator()
    useEffect(()=>{
        dispatch(getIncome())
        setIncome(salary)
        dispatch(getUser())
    },[salary])

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>(
                <View style={{marginRight:10}}>
                <TouchableOpacity onPress={()=>navigation.navigate('profile')}  >
                     <Avatar 
                     rounded 
                     source={{uri:userData ? userData.imageURL : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" }} />
                </TouchableOpacity>
                </View>
            ),
            headerShown:income ? true : false
        })
    })
    const handleIncome=async (income)=>{
        await firebase.firestore()
                .collection('usersIncome')
                .doc(firebase.auth().currentUser.uid)
                .set({
                    income:parseInt(income)
                })
        setIncome(income)
    }

    if(!income){
        return (
            <View
            behavior='padding'
             style={styles.container}>
                <Image style={styles.logo} source={{uri:"https://previews.123rf.com/images/artistbandung/artistbandung2006/artistbandung200600743/153093157-bag-with-money-logo-suck-money-logo.jpg"}} />
                <Text style={styles.main}>Welcome To</Text>
                <Text style={styles.secondary}>Expense Tracker</Text>
                <Text style={styles.text}>In Order to start your expense tracking please fill your monthly Income</Text>
                <TextInput  style={styles.input} value={input} onChangeText={e=>setInput(e)} keyboardType='number-pad' placeholder="In USD $" />
               <View style={styles.btn}>
               <Button onPress={()=>handleIncome(input)} disabled={!input} title="Let's start"/>
               </View>

            </View>
        )
    }

    return  (<Tab.Navigator tabBarOptions={{showLabel:false,tabStyle:{
        backgroundColor:'#00203FFF'
    }}}>
    <Tab.Screen  name="summary" component={Summary} options={{
        tabBarIcon:({focused})=>(
            <Ionicons name='home' color={focused ?  '#FCF6F5FF' : 'grey'} size={30}/>
        ),
    }} />
    <Tab.Screen name="chart" component={chart} options={{

         tabBarIcon:({focused})=>(
            <FontAwesome5 name="chart-bar" size={30} color={focused ?  '#FCF6F5FF' : 'grey'} />
        ),
    }} />
    <Tab.Screen name="overview" component={Overview} options={{
         tabBarIcon:({focused})=>(
            <FontAwesome5 name="book-reader" size={30} color={focused ?  '#FCF6F5FF' : 'grey'} />
        ),
    }} />
    
  </Tab.Navigator>)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'white'
    },
    logo:{
        // marginTop:40,
        width:150,
        height:150,
        borderRadius:20,
        marginBottom:10
    },
    main:{
        fontSize:30,
        fontWeight:'bold'
    },
    secondary:{
        fontSize:30,
        fontWeight:'bold',
        
    },
    text:{
        marginTop:20,
        textAlign:'center',
        fontSize:18,
        marginBottom:10,
        color:'black'
    },
    input:{
        backgroundColor:'rgba(0,0,0,0.1)',
        height:40,
        width:100,
        textAlign:'center',
        marginVertical:10,
        padding:10,
        fontSize:15
    },
    btn:{
        marginTop:5,
        width:200
    }
  });
  

export default Home
