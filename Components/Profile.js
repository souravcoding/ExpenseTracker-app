import React, { useEffect } from 'react'
import { View, Text,StyleSheet,Button,Alert } from 'react-native'
import {Avatar} from 'react-native-elements'
import firebase from 'firebase'
import {  useDispatch, useSelector } from 'react-redux'
import { getUser, resetData,LOGOUT } from '../Redux/Action'
const Profile = (props) => {

  const userData=useSelector(state=>state.user)
  const income=useSelector(state=>state.income)
  const items=useSelector(state=>state.items)
  const expense=useSelector(state=>state.expense)
  const dispatch=useDispatch()
  const logout=()=>{
    firebase.auth().signOut()
    dispatch(LOGOUT())
    } 

    return (
        <View style={styles.container}>
          <View style={styles.main}>
          <Avatar 
                rounded 
                size={125}
                source={{uri:userData.imageURL ? userData.imageURL : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" }} />

            <View style={styles.block}>
            <Text style={styles.text}>username</Text>
            <Text style={styles.text}>{userData.username}</Text>
            </View>
            <View style={styles.block}>
            <Text style={styles.text}>E-mail</Text>
            <Text style={styles.text}>{userData.mail}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.heading}>Your Expense</Text>
              <Text style={{...styles.heading,color:'#ff9a8d'}}>$ {expense}</Text>
              <Text style={styles.heading}>Remaining Money</Text>
              <Text style={{...styles.heading,color:'#aed6dc'}}>$ {income-expense} </Text>
              
            </View>
            {
              income-expense<1000 ? <Text style={{...styles.heading,color:'#DB4C77'}} >spent your money carefully buddy  🤯</Text>
              : <Text  style={{...styles.heading,color:'#1e3d59'}}>you left with sufficient amount no worries 😃</Text>
            }
            <View style={styles.btn}>
            <Button title="reset income" 
            onPress={()=>Alert.alert('Reset Data','Are you sure you want to reset Income?',[{
              'text':'No'
            },
            {
              'text':'Yes',onPress:(()=>{
                  dispatch(resetData())
                  props.navigation.popToTop()
                
                })
            }
            ])} 
            color='#3CA2CB' />
            </View>
            <View style={styles.btn}>
            <Button title="logout" onPress={logout} color="red" />
            </View>
              
          </View>
             
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding:20,
    },
    main:{
      flex:1,
      marginTop:10,
      width:'100%',
      alignItems:'center'
    },
    text:{
      fontSize:18,
      fontWeight:'bold',
      textAlign:'center',
      color:'black'
    },
    block:{
      marginVertical:10,
      borderBottomWidth:1,
      borderColor:'lightgrey',
      width:'100%',
      fontSize:18,
      flexDirection:'row',
      justifyContent:'space-between'
    },
    box:{
      width:'80%',
      marginVertical:15,
      borderRadius:15,
      padding:10,
      alignItems:'center',
      shadowColor:'black',
      shadowOpacity:0.26,
      shadowOffset:{
        width:2,
        height:2
      },
      shadowRadius:10,
      elevation:10,
      backgroundColor:'#1e3d59'
    },
    heading:{
      fontSize:20,
      fontWeight:'bold',
      textAlign:'center',
      color:'white'
    },
    btn:{
      marginTop:15,
      width:'60%'
    }
  });


export default Profile
