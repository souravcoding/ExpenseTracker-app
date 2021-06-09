import React from 'react'
import { View, Text,StyleSheet,ScrollView} from 'react-native'
import { useSelector } from 'react-redux'
import EachItem from './EachItem'

const Overview = () => {
    let allItems=useSelector(state=>state.items)
    let foodItems=allItems.filter(item=>item.category==='food')
    let clothes=allItems.filter(item=>item.category==='clothes')
    let funds=allItems.filter(item=>item.category==='funds')
    let others=allItems.filter(item=>item.category==='other')
    let tech=allItems.filter(item=>item.category==='tech')
    console.log(foodItems);

    if(foodItems.length>0 || clothes.length>0 || funds.length>0 || tech.length>0 || others.length>0  ){
        return (
            <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
        
            <Text style={styles.heading}>Expense Break-Down</Text>
                {foodItems.length>0 && <EachItem data={foodItems} style={{backgroundColor:'#89ABE3FF'}} />}
               {clothes.length>0 && <EachItem data={clothes} style={{backgroundColor:'#FCF6F5FF'}}/>}
                {funds.length>0 && <EachItem data={funds} style={{backgroundColor:'#E69A8DFF'}}/>}
                {tech.length>0 && <EachItem data={tech} style={{backgroundColor:'#FAD0C9FF'}}/>}
             { others.length>0 && <EachItem data={others} style={{backgroundColor:'#F2EDD7FF'}}/>}
    
            </ScrollView>
        )
    }

    return (
       <View style={styles.container}>
            <Text style={styles.heading}>Expense Break-Down</Text>
            <View style={styles.box}>
            <Text style={styles.text}>
                Nothing added to the list 
                Add items to your list...
           </Text>
            </View>
           
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding:10
    },
    heading:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:25,
        textDecorationColor:'#696667FF',
        textDecorationLine:'underline',
        color:'#28334AFF'
    },
    box:{
        flex:1,
        justifyContent:'center'
    },
    text:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:25,
        color:'#28334AFF'
    }
  });

export default Overview
