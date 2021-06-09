import React,{useEffect} from 'react'
import { View, Text,StyleSheet,Button,FlatList,TouchableOpacity} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, getIncome, getItems,getUser} from '../Redux/Action'
import {MaterialIcons} from '@expo/vector-icons'
import { ScrollView } from 'react-native'
const Summary = (props) => {
    const dispatch=useDispatch()
    const state=useSelector(state=>state)
    const itemList=useSelector(state=>state.items)
    console.log(itemList);
    useEffect(()=>{
        dispatch(getIncome())
        dispatch(getItems())
        dispatch(getUser())
    },[])


    return (
        
        <View style={styles.screen}>
        
            <View style={styles.summary}>
                <View style={styles.income}>
                    <Text style={styles.heading}>Your Income</Text>
                    <Text style={styles.money}>+{state.income} $</Text>
                </View>
                <View style={styles.expense}>
                    <Text style={styles.heading}>Your Expense</Text>
                    <Text style={styles.money}>-{state.expense} $</Text>
                </View>
            </View>
            <View style={styles.remains}>
                <Text style={styles.remaining}>Your Remaining Amount</Text>
                <Text style={styles.remaining}>{state.income-state.expense} $</Text>
            </View>
            <View>
                <Text style={{fontSize:20,fontWeight:'bold',marginVertical:15}}>Your Monthly Expense List</Text>
            </View>

           {itemList && <View style={styles.list}>
                <FlatList data={itemList} 
                renderItem={({item})=>{
                    return <View style={{...styles.item,backgroundColor:item.PorL==='profit' ? '#3CA2CB' : "#DB4C77"}}>
                        <Text style={styles.text}>{item.itemName}</Text>
                       <View style={{flexDirection:'row',
                       alignItems:'center',
                       justifyContent:'space-between',
                       width:90}}>
                       <Text style={styles.text}>${item.cost}</Text>
                       <TouchableOpacity onPress={()=>{dispatch(deleteItem(item.id))}}>
                        <MaterialIcons name="delete-forever" size={35} color="black" />
                        </TouchableOpacity>
                       </View>
                        
                    </View>
                }}
                 />
            </View>}
                <View style={styles.btn}>
                <Button title="add new item" onPress={()=>props.navigation.navigate('add')}/>
                </View>

        </View>

    )
}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        padding:10,
        backgroundColor:'white'
    },
    summary:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    income:{
        width:'45%',
        height:130,
        backgroundColor:'#3CA2CB',
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center'
    },
    expense:{
        width:'45%',
        height:130,
        backgroundColor:'#DB4C77',
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center'
    },
    remains:{
        marginTop:10,
        padding:10,
        backgroundColor:'lightgrey',
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center'
    },
    remaining:{
        color:'black',
        fontSize:16,
        fontWeight:"bold"
    },
    heading:{
        color:'black',
        fontSize:20,
        fontWeight:'bold'
    },
    money:{
        fontSize:20,
        color:'white',
        fontWeight:'bold'
    },
    list:{

        width:'100%',
        height:230
    },
    item:{
        width:'100%',
        flexDirection:"row",
        height:50,
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10,
        padding:10,
        borderRadius:10
    },
    text:{
        color:'white',
        fontSize:18,
        fontWeight:'bold'
    },
    btn:{
        marginTop:10,
        width:200
    }
})

export default Summary
