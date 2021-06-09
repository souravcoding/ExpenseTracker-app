import React,{useState} from 'react'
import { View, Text,TextInput,StyleSheet,Button,KeyboardAvoidingView } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import { CheckBox } from 'react-native-elements'
import firebase from 'firebase'
import 'firebase/firestore'

const AddItems = (props) => {
    const [selectedValue, setSelectedValue] = useState("other");
    const [input,setInput]=useState('')
    const [cost,setCost]=useState('')
    const [profit,setProfit]=useState(true)
    const [loss,setLoss]=useState(false)
    const addItems= async (input,category,cost,Profit)=>{
        await firebase.firestore()
                .collection('useritems')
                .doc(firebase.auth().currentUser.uid)
                .collection('items')
                .add({
                    itemName:input,
                    category,
                    PorL:profit ? "profit"  : 'loss',
                    cost:parseInt(cost)
                }).then(()=>{
                    props.navigation.goBack()
                    console.log('added item');
                })
             
    }
    return (
        <KeyboardAvoidingView
        behavior='height'
        keyboardVerticalOffset={90}
         style={styles.screen}>
            
                <TextInput value={input} 
                onChangeText={e=>setInput(e)}
                 style={styles.input} placeholder="Enter The Item" />
                  <TextInput keyboardType='numeric' value={cost} 
                onChangeText={e=>setCost(e)}
                 style={styles.input} placeholder="Enter Amount USD$" />

            <Text style={styles.text}>Select between Profit/Loss</Text>
             <View style={styles.check}>
             <CheckBox
                        center
                        title='Profit'
                        checked={profit}
                        onPress={()=>setProfit(!profit)}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        />
                <CheckBox
                        center
                        title='Loss'
                        checked={loss}
                        onPress={()=>setLoss(!loss)}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        />

             </View>

             <Text style={styles.text}>Select the category</Text>
            <View style={styles.picker}>
            <Picker style={styles.picker} 
                      selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
             >
            <Picker.Item  label="food" value="food" />
            <Picker.Item  label="clothes" value="clothes" />
            <Picker.Item  label="tech" value="tech" />
            <Picker.Item  label="funds" value="funds" />
            <Picker.Item  label="other" value="other" />

            </Picker>
            </View>
            <View style={styles.btn}>
            <Button onPress={()=>addItems(input,selectedValue,cost,profit)} disabled={!input || !cost} title="add"  />
            {/* <View style={{height:100}} /> */}
            </View>
          
        </KeyboardAvoidingView>
    )
}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        // justifyContent:'center'
    },
  picker:{
    width: 150,
     height: 44,
     borderColor:'black',
     borderWidth:1
    // backgroundColor:'lightgrey'
  },
  input:{
      width:'80%',
      borderColor:'black',
      borderBottomWidth:2,
      height:40,
      marginTop:10

  },
  text:{
      fontWeight:'bold',
      fontSize:20,
      marginVertical:10
  },
  check:{
      flexDirection:'row'
  },
  btn:{
      width:200,
      marginTop:20
  }
})

export default AddItems
