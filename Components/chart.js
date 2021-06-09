import React from 'react'
import { View, Text,StyleSheet,ScrollView } from 'react-native'
import PureChart from 'react-native-pure-chart';
import { useSelector } from 'react-redux';
const chart = () => {
    const pie=useSelector(state=>state.pieChartData)
    const bar=useSelector(state=>state.barChartData)
   
    let barData=bar.filter(item=>{
        return item.y!==0
    })
    let pieFilterData=pie.filter(item=>{
        return item.value!==0
    })
    let sampleData = [    {
        seriesName: 'series1',
        data: barData,
        color: '#297AB1'
      },
  ] 
  let pieData= pieFilterData


    return (
        <View style={styles.screen}>
            <ScrollView>
            <Text style={styles.text}>Bar Chart Of your Monthly Expense</Text>
            <View style={styles.bar}>
          {barData.length>0 ? <PureChart height={200}  style={styles.bar}  data={sampleData} type="bar" />
          : <View style={styles.nothing}>
              <Text>Nothing to show yet</Text>
          </View>
          }
            </View>
           
            <Text style={styles.text}>Pie Chart For better Understanding</Text>
            <View style={styles.pie}>
            {pieData.length>0 ? <PureChart   data={pieData} type="pie" />
            : <View>
                <Text>nothing to show yet</Text>
            </View>
            }
            <View >
            <Text style={{fontWeight:'bold',fontSize:16,color:'grey'}} >~ Food</Text>
            <Text style={{fontWeight:'bold',fontSize:16,color:'tomato' }} >~ Clothes</Text>
            <Text style={{fontWeight:'bold',fontSize:16,color:'blue'}} >~ Funds</Text>
            <Text style={{fontWeight:'bold',fontSize:16,color:'pink'}} >~ Tech</Text>
            <Text style={{fontWeight:'bold',fontSize:16,color:'orange'}} >~ Others</Text>
            </View>
            </View>
            </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center'

    },
    text:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
        marginVertical:10
    },
    bar:{
        height:250
    },
    pie:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-around',
        backgroundColor:'white'
    },
    nothing:{
        backgroundColor:'white',
        width:'100%',
        height:200,
        justifyContent:'center',
        alignItems:'center'
    }
})


export default chart
