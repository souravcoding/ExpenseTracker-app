import React from 'react'
import { View, Text,StyleSheet,FlatList } from 'react-native'

const EachItem = (props) => {
    let total=0
    let category;
    props.data.forEach(item=>{
        total+=item.cost
        category=item.category
    })
    console.log(total)
    return (
        <View style={{...styles.container,...props.style}}>
            <Text style={styles.heading}>{category}</Text>
           
            <FlatList 
            data={props.data} 
            renderItem={({item})=>{
                return <View style={styles.item}>
                <Text style={styles.itemname}>{item.itemName}</Text>
                <Text style={styles.cost} >{item.cost} $</Text>
                </View>
            }}
             />
            <View style={{...styles.item,marginVertical:8,borderColor:'lightgrey',borderTopWidth:2}}>
            <Text  style={styles.itemname}>Total</Text>
             <Text  style={styles.cost}>~{total} $</Text>
            </View>
            
        </View>
    )
}


export default EachItem

const styles = StyleSheet.create({
    container: {
    width:'80%',
     alignItems:'center',
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
     marginVertical:15
    },
    heading:{
        textTransform: "capitalize",
        fontSize:20,
        fontWeight:'bold',
        marginVertical:5
    },
    item:{
        width:200,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    itemname:{
        fontSize:18,
        fontWeight:'bold'
    },
    cost:{
        fontSize:18,
        fontWeight:'bold'
    },

  });